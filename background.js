var DB_VERSION = 1 // Bump this every time changes to the database structure is changed
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB

//Save a file by URL to disk
async function saveLessonFile (date, time, subject, teacher, filename, url, sendResponse) {
  debugLog('Saving lesson file...')
  //Fingers crossed this is unique enough. Otherwise, that's a problem.
  let saveName = date + time + filename

  debugLog(saveName)

  var res = await fetch(url)
  var blob = await res.blob()

  openIndexedDB(function (store) {
    // Add some data
    store.put({name: saveName, blob: blob, displayName: filename})
  })

  chrome.runtime.sendMessage({action: 'NewFileSaved', filename: filename})

  return saveName
}

function openIndexedDB (action) {
  // Open (or create) the database
  var open = indexedDB.open('LessonFiles', DB_VERSION)

// Create the schema
  open.onupgradeneeded = function () {
    var db = open.result
    var store = db.createObjectStore('LessonStore', {keyPath: 'name'})
  }

  open.onsuccess = function () {
    // Start a new transaction
    var db = open.result
    var tx = db.transaction('LessonStore', 'readwrite')
    var store = tx.objectStore('LessonStore')

    action(store)

    // Close the db when the transaction is done
    tx.oncomplete = function () {
      db.close()
    }
  }

  open.onerror = function (error) {
    debugLog('Could not open IndexedDB', error)
    return null
  }

  return open
}

//A bunch of listeners so we can interact with this script from other scripts.
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action == 'options') {
    chrome.runtime.openOptionsPage()
  } else if (message.action == 'downloadScheduleFile') {
    sendResponse({filename: saveLessonFile(message.date, message.time, message.subject, message.teacher, message.filename, message.url)})
  } else if (message.action == 'requestFile') {
    debugLog('Files were requested')

    openIndexedDB(function (store) {
      var request = store.getAll()

      request.onsuccess = function (event) {
        let result = this.result

        // Generate new urls as they do not last
        result = result.map(function (res) {
          return Object.assign(res, {
            url: window.URL.createObjectURL(res.blob)
          })
        })

        debugLog('Got data back', result)
        chrome.runtime.sendMessage({action: 'returnFilesInfo', entries: result})
      }

      request.onerror = function (err) {
        console.log('Could not get lessons', err)
      }
    })
  } else if (message.action === 'requestCacheSize') {
    openIndexedDB(function (store) {
      var request = store.getAll()

      request.onsuccess = function (event) {
        let result = this.result

        // Generate new urls as they do not last
        let size = result.reduce(function (sum, res) {
          return sum + res.blob.size
        }, 0)

        chrome.runtime.sendMessage({
          action: 'cacheSize',
          error: null,
          cacheSize: size
        })
      }

      request.onerror = function (error) {
        chrome.runtime.sendMessage({
          action: 'cacheSize',
          error: error,
          cacheSize: 0
        })
      }

    })
  } else if (message.action == 'deleteFilesystem') {
    //Clear out storage here
    debugLog('Got del message')

    openIndexedDB(function (store) {
      store.clear()
    })

  } else if (message.action == 'openDashboard') {
    openPage()
  } else if (message.action == 'updateTicker') {
    if (typeof message.number === 'undefined') {
      checkUndoneHomework()
    } else {
      chrome.browserAction.getBadgeText({}, function (text) {
        var prevText = parseInt(text)
        if (text == '') prevText = 0
        var newNumber = prevText + message.number
        updateTickerWithNumber(newNumber)
      })
    }
  }
})

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'update') {
    //This code will run every time the plugin is updated
    //It will make the news paragraph appear under the ++ Settings button
    setStorage({'showNews': true})
    getStorage('dashboardOpened', function (obj) {
      if (!obj.dashboardOpened) {
        openPage()
        setStorage({'dashboardOpened': true})
      }
    })
  }
})

function openPage () {
  var dashboardURL = chrome.runtime.getURL('dashboard/dashboard.html')
  //Get all tabs with the same URL as dashboard
  chrome.tabs.query({url: dashboardURL}, function (tabs) {
    //If we have a dashboard tab already open, switch to that instead of opening a new one
    if (tabs.length > 0) {
      chrome.tabs.update(tabs[0].id, {active: true})
    } else {
      chrome.tabs.query({active: true}, function (tabs) {
        if (tabs[0].url === 'chrome://newtab/') {
          //Switch to Dashboard tab if in new tab window
          chrome.tabs.update(tabs[0].id, {url: dashboardURL})
        } else {
          //Create new dashboard tab
          chrome.tabs.create({
            url: dashboardURL
          })
        }
      })
    }
  })
}

chrome.browserAction.onClicked.addListener(openPage)

//A regular expression which parses a title from the RSS feed, and extracts the good info.
var downRegex = /EASY-A lukker ned (.*) den (\d\d)\/(\d\d) kl\. ((\d\d:\d\d) - (\d\d:\d\d)|(\d\d)-(\d\d))/

var weekDays = {
  'mandag': 'Monday',
  'tirsdag': 'Tuesday',
  'onsdag': 'Wednesday',
  'torsdag': 'Thursday',
  'fredag': 'Friday',
  'lørdag': 'Saturday',
  'søndag': 'Sunday'
}

function doNothing (input) {
  debugLog('Doing nothing succeded')
}

function cacheYearSchedule () {
  var year = new Date().getYear()
  var start = year + '-01-01'
  var end = year + '12-30'
  getSchedule(start, end, doNothing)
}

cacheYearSchedule()

//This function will check EASY-A for downtime
function checkEasyADowntime () {
  var currentDate = new Date()

  //We use this to check if anything is going down now. If not, we change the message setting to blank.
  var isGoingDown = false

  //Uncomment this for testing. This is a timestamp where the downtime would be relevant.
  //currentDate = new Date("1482048000" * 1000);

  //EASY-A's update site
  var url = 'http://admsys.stil.dk/Service/RSS/RSS/EASY-A-Nyhedsliste.rss'

  //jQuery GET request
  $.get(url, function (data) {
    $(data).find('channel > item').each(function () {
      //The title of the entry
      var title = $(this).find('title').html()
      //The date that the RSS feed entry was published
      var pubDate = $(this).find('pubDate').html()

      var regexMatch = title.match(downRegex)
      /*
       * This returns a bit complicated stuff, so I'll explain the whole array
       * 0: The whole title
       * 1: Day of the week in Danish
       * 2: The day of the month
       * 3: The month of the year in Danish
       * 4: The whole "time" part of the title, as in when it'll be down
       * 5: In the case of time with minutes, this is the start time
       * 6: In the case of time with minutes, this is the end time
       * 7: In the case of time without minutes, this is the start time
       * 9: In the case of time without minutes, this is the end time.
       */

      if (regexMatch !== null) {
        debugLog(regexMatch)

        //A date object is easier to work with
        var pubDate = new Date(Date.parse(pubDate))

        var year = '/' + (1900 + pubDate.getYear())
        //This one returns true if pubDate already passed the month EASY-A will go down.
        if (regexMatch[3] < pubDate.getMonth() + 1) {
          var year = 1901 + pubDate.getYear()
          var year = '/' + year
        }

        //Now we know the date that the site is going down
        var downDate = Date.parse(regexMatch[3] + '/' + regexMatch[2] + year)

        var downStartTime, downEndTime
        //Check if the time has minutes, and then format the start and end times into a javascript Date object depending on if it has
        if (regexMatch[4].length > 5) {
          downStartTime = Date.parse(regexMatch[3] + '/' + regexMatch[2] + year + ' ' + regexMatch[5])
          downEndTime = Date.parse(regexMatch[3] + '/' + regexMatch[2] + year + ' ' + regexMatch[6])
          if (downStartTime > downEndTime) {
            downEndTime = Date.parse(regexMatch[3] + '/' + ((parseInt(regexMatch[2]) + 1)) + year + ' ' + regexMatch[6])
          }
        } else {
          downStartTime = Date.parse(regexMatch[3] + '/' + regexMatch[2] + year + ' ' + regexMatch[7] + ':00')
          downEndTime = Date.parse(regexMatch[3] + '/' + regexMatch[2] + year + ' ' + regexMatch[8] + ':00')
          if (downStartTime > downEndTime) {
            downEndTime = Date.parse(regexMatch[3] + '/' + ((parseInt(regexMatch[2]) + 1)) + year + ' ' + regexMatch[8]) + ':00'
          }
        }
        //After that huge mess, we now got the start and end times

        //This is the URL to the article. We can use this.
        var url = $(this).find('link').html()

        //If it's not already done going down.
        if (downEndTime > currentDate) {
          debugLog('EASY-A going down')

          //Proper date elements format nicer than a big ol' timestamp
          downStartTime = new Date(downStartTime)
          downEndTime = new Date(downEndTime)

          var link = $(this).find('link').html()
          getStorage('lang', function (obj) {
            if (!chrome.runtime.error) {
              if (obj.lang === 'dansk') {
                var message = 'UDDATA går ned ' + regexMatch[1] + ' den ' + regexMatch[2] + '/' + regexMatch[3] + ' ' + regexMatch[4]
              } else {
                var message = 'UDDATA is going to be down ' + weekDays[regexMatch[1]] + ' the ' + regexMatch[2] + '/' + regexMatch[3] + ' ' + regexMatch[4]
              }
              console.log($(this))
              sendDownMessage(message, link)
              isGoingDown = true
            }
          })
        }
      }
    })
    //Instead of timing it properly, we just wait 100ms and hope it'll all be over then. It probably is, so it's no big problem
    window.setTimeout(function () {
      if (!isGoingDown) setStorage({'message': ''})
    }, 100)
  })
}

function sendDownMessage (message, href) {
  var link = '<a href=\'' + href + '\' class=\'warning\'><b>' + message + '</b></a>'

  getStorage('message', function (obj) {
    if (!chrome.runtime.error) {
      if (link !== obj.message) {

        //Creates a chrome notification. Mostly copy-pasted, should probably be changed
        chrome.notifications.create({
          iconUrl: chrome.runtime.getURL('resources/icons/icon48.png'),
          title: 'Uddata going down',
          type: 'basic',
          message: message,
          buttons: [{title: 'Learn More'}],
          isClickable: true,
          priority: 2,
        }, function () { })

        //Adds a listener to the notification that opens the url when we click it.
        chrome.notifications.onButtonClicked.addListener(function () {
          chrome.tabs.create({
            url: href
          })
        })

        setStorage({'message': link})
      }
    }
  })
}

checkEasyADowntime()

//Check EASY-A for new downtime info every 20 minutes.
setInterval(checkEasyADowntime, 1000 * 60 * 20)

//Check for how many undone homeworkLessons we have from today to tomorrow.
function checkUndoneHomework () {
  var today = new Date()
  var toDate = new Date().setDate(today.getDate() + 1)
  getStorage('doneHomework', function (doneObj) {
    getStorage({'homeworkWords': 'lektie,forbered'}, function (wordsObj) {
      homeworkList = stringToList(wordsObj.homeworkWords)
      getSchedule(ToShortISODate(today), ToShortISODate(toDate), function (schedule) {
        var homework = 0
        for (day in schedule) {
          var theDay = schedule[day]
          for (lessonNumber in theDay) {
            var lesson = theDay[lessonNumber]
            if (typeof lesson['Note'] !== 'undefined' && lesson['Note'] !== '') {
              var homeworkLesson = false
              for (word in homeworkList) {
                if (lesson['Note'].toUpperCase().includes(homeworkList[word].toUpperCase()))
                  homeworkLesson = true
              }
              if (homeworkLesson) {
                var hash = false
                var noteHash = lesson['Note'].replace(homeworkNoteRegex, '').hashCode()
                for (hash in doneObj.doneHomework) {
                  if (noteHash == doneObj.doneHomework[hash])
                    hash = true
                }
                if (!hash) homework++
              }
            }
          }
        }
        updateTickerWithNumber(homework)
      })
    })
  })
}

function updateTickerWithNumber (number) {
  getStorage('homeworkBadge', function (obj) {
    if (obj.homeworkBadge) {
      console.log('Setting')
      if (number !== 0) {
        chrome.browserAction.setBadgeText({text: number.toString()})
        console.log('Ayy')
      } else {
        chrome.browserAction.setBadgeText({text: ''})
        console.log('Ayy2')
      }
    } else {
      chrome.browserAction.setBadgeText({text: ''})
    }
  })

}

checkUndoneHomework()
