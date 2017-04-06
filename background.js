navigator.requestFileSystem  = navigator.requestFileSystem || navigator.webkitRequestFileSystem;

function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'We are out of room for our FS thing';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'Some thing was 404';
      break;
    case FileError.SECURITY_ERR:
      msg = 'We screwed up security';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'Honestly don\'t know what this error means, but you have it';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'Something has an invalid state?';
      break;
    default:
      msg = 'Unknown Error Happened. Good luck fixing this one.';
      break;
  };

  alert(msg);
}

var INITIAL_QUOTA = 1024*1024*1024*5; //5GiB

//This is the filesystem object we want to use to save our precious lesson files
var fs = null;

//When we finally get access to the filesystem.
function successCallback(newfs) {
	console.log("I honestly didn't expect to get this far");
	fs = newfs;
}

function saveLessonFile(date, time, subject, teacher, filename, url) {
	if (fs !== null) {

		//Fingers crossed this is unique enough. Otherwise, that's a problem.
		let saveName = date + time + filename;

		console.log(saveName);

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200){
				//this.response is what you're looking for
				//handler(this.response);
				let blob = this.response;

				fs.root.getFile(saveName, {create: true}, function(fileEntry) {

					// Create a FileWriter object for our FileEntry (log.txt).
					fileEntry.createWriter(function(fileWriter) {

						fileWriter.onwriteend = function(e) {
							console.log('Write completed.');
						};

						fileWriter.onerror = function(e) {
							console.log('Write failed: ' + e.toString());
						};

						fileWriter.write(blob);
						console.log(fileEntry.toURL());

					}, errorHandler);

				}, errorHandler);

			}
		}
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();



	} else {
		console.log("Can't save files; user said no");
	}
}

function storeFiles() {
	navigator.webkitPersistentStorage.requestQuota(INITIAL_QUOTA, function(grantedBytes) {
		window.webkitRequestFileSystem(PERSISTENT, grantedBytes, successCallback, errorHandler);
	}, function(e) {
		alert("Hey. UD++ vil gerne lagre filer, så vi kan gemme filerne på lektionerne. Pls sig ja næste gang den her irritirende ting popper up. Vi bruger max 5 GB i øjeblikket anyway.");
		console.log('Error', e);
	});

}

function toArray(list) {
	  return Array.prototype.slice.call(list || [], 0);

}

function listResults(entries) {
	// Document fragments can improve performance since they're only appended
	//   // to the DOM once. Only one browser reflow occurs.
	var fragment = document.createDocumentFragment();
//
//	entries.forEach(function(entry, i) {
//		var img = entry.isDirectory ? '<img src="folder-icon.gif">' :
//			'<img src="file-icon.gif">';
//		var li = document.createElement('li');
//		li.innerHTML = [img, '<span>', entry.name, '</span>'].join('');
//		console.log(i);
//	});
	console.log(entries);
}

storeFiles();


chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	if(message.action == "options"){
		chrome.runtime.openOptionsPage();
	} else if (message.action == "downloadScheduleFile") {
		saveLessonFile(message.date, message.time, message.subject, message.teacher, message.filename, message.url);
	} else if (message.action == "requestFile") {
		var dirReader = fs.root.createReader();
		var entries = [];

		// Call the reader.readEntries() until no more results are returned.
		var readEntries = function() {
			dirReader.readEntries (function(results) {
				if (!results.length) {
					listResults(entries.sort());
				} else {
					entries = entries.concat(toArray(results));
					readEntries();
				}
			}, errorHandler);
		};

		readEntries(); // Start reading dirs.<Paste>
	}
});



chrome.runtime.onInstalled.addListener(function(details){
	if(details.reason === "update"){
		//This code will run every time the plugin is updated
		//It will make the news paragraph appear under the ++ Settings button
		setStorage({'showNews' : true});
	}
});

function openPage() {
	chrome.tabs.create({
		url: chrome.runtime.getURL('dashboard/dashboard.html')
	});
}

chrome.browserAction.onClicked.addListener(openPage);

//A regular expression which parses a title from the RSS feed, and extracts the good info.
var downRegex = /EASY-A lukker ned (.*) den (\d\d)\/(\d\d) kl\. ((\d\d:\d\d) - (\d\d:\d\d)|(\d\d)-(\d\d))/;

var weekDays = {
	"mandag" : "Monday",
	"tirsdag" : "Tuesday",
	"onsdag" : "Wednesday",
	"torsdag" : "Thursday",
	"fredag" : "Friday",
	"lørdag" : "Saturday",
	"søndag" : "Sunday"
};

function doNothing(input) {
	console.log("Doing nothing succeded");
}

function cacheYearSchedule() {
	var year = new Date().getYear();
	var start = year + "-01-01";
	var end = year + "12-30";
	getSchedule(start, end, doNothing);
}
cacheYearSchedule();

//This function will check EASY-A for downtime
function checkEasyADowntime() {
	var currentDate = new Date();

	//We use this to check if anything is going down now. If not, we change the message setting to blank.
	var isGoingDown = false;

	//Uncomment this for testing. This is a timestamp where the downtime would be relevant.
	//currentDate = new Date("1482048000" * 1000);


	//EASY-A's update site
	var url = 'http://admsys.stil.dk/Service/RSS/RSS/EASY-A-Nyhedsliste.rss';

	//jQuery GET request
	$.get(url, function (data) {
		$(data).find("channel > item").each(function() {
			//The title of the entry
			var title = $(this).find("title").html();
			//The date that the RSS feed entry was published
			var pubDate = $(this).find("pubDate").html();

			var regexMatch = title.match(downRegex);
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
				console.log(regexMatch);

				//A date object is easier to work with
				var pubDate = new Date(Date.parse(pubDate));

				var year = "/" + (1900 + pubDate.getYear());
				//This one returns true if pubDate already passed the month EASY-A will go down.
				if (regexMatch[3] < pubDate.getMonth() + 1) {
					var year = 1901 + pubDate.getYear();
					var year = "/" + year;
				}

				//Now we know the date that the site is going down
				var downDate = Date.parse(regexMatch[3] + "/" + regexMatch[2] + year);

				var downStartTime, downEndTime;
				//Check if the time has minutes, and then format the start and end times into a javascript Date object depending on if it has
				if (regexMatch[4].length > 5) {
					downStartTime = Date.parse(regexMatch[3] + "/" + regexMatch[2] + year + " " + regexMatch[5]);
					downEndTime = Date.parse(regexMatch[3] + "/" + regexMatch[2] + year + " " + regexMatch[6]);
					if (downStartTime > downEndTime) {
						downEndTime = Date.parse(regexMatch[3] + "/" + ((parseInt(regexMatch[2]) + 1)) + year + " " + regexMatch[6]);
					}
				} else {
					downStartTime = Date.parse(regexMatch[3] + "/" + regexMatch[2] + year + " " + regexMatch[7] + ":00");
					downEndTime = Date.parse(regexMatch[3] + "/" + regexMatch[2] + year + " " + regexMatch[8] + ":00");
					if (downStartTime > downEndTime) {
						downEndTime = Date.parse(regexMatch[3] + "/" + ((parseInt(regexMatch[2]) + 1)) + year + " " + regexMatch[8]) + ":00";
					}
				}
				//After that huge mess, we now got the start and end times

				//This is the URL to the article. We can use this.
				var url = $(this).find("link").html();

				//If it's not already done going down.
				if (downEndTime > currentDate) {
					console.log("Going down");

					//Proper date elements format nicer than a big ol' timestamp
					downStartTime = new Date(downStartTime);
					downEndTime = new Date(downEndTime);


					var link = $(this).find("link").html();
					getStorage('lang', function(obj) {
						if (!chrome.runtime.error) {
							if (obj.lang === "dansk") {
								var message = "UDDATA går ned " + regexMatch[1] + " den " + regexMatch[2] + "/" + regexMatch[3] + " " + regexMatch[4];
							} else {
								var message = "UDDATA is going to be down " + weekDays[regexMatch[1]] + " the " + regexMatch[2] + "/" + regexMatch[3] + " " + regexMatch[4];
							}
							console.log($(this));
							sendDownMessage(message, link);
							isGoingDown = true;
						}
					});
				}
			}
		});
		//Instead of timing it properly, we just wait 100ms and hope it'll all be over then. It probably is, so it's no big problem
		window.setTimeout(function() {
			if (!isGoingDown) setStorage({"message": '' });
		}, 100);
	});
}

function sendDownMessage(message, href) {
	var link = "<a href='" + href + "' class='warning'><b>" + message + "</b></a>";

	getStorage('message', function(obj) {
		if (!chrome.runtime.error) {
			if (link !== obj.message) {

				//Creates a chrome notification. Mostly copy-pasted, should probably be changed
				chrome.notifications.create({
					iconUrl: chrome.runtime.getURL('resources/icons/icon48.png'),
					title: 'Uddata going down',
					type: 'basic',
					message: message,
					buttons: [{ title: 'Learn More' }],
					isClickable: true,
					priority: 2,
				}, function() { });

				//Adds a listener to the notification that opens the url when we click it.
				chrome.notifications.onButtonClicked.addListener(function() {
					chrome.tabs.create({
						url: href
					});
				});

				setStorage({"message": link });
			}
		}
	});
}

checkEasyADowntime();

//Check EASY-A for new downtime info every 20 minutes.
setInterval(checkEasyADowntime, 1000 * 60 * 20);
