chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	if(message.optionsClick){
		chrome.runtime.openOptionsPage();
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

$(body).append("test");
document.onload = function() {
	$("body").append("Ayy lmao");
}

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

			console.log(regexMatch);

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
