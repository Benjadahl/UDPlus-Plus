/*      schedule.js

				THIS IS THE PAGESCRIPT FOR THE SCHEDULE PAGE
				*/

//Set the current page variable
curPage = "schedule";
var homeworkList = ["lektie"];

//On the download links in class notes, set the title attribute to the file name, so we can see the full filename on hover.
function setTitleToDownload() {
	$("a[download]").each(function() {
		$(this).attr("title", $(this).attr("download"));
	});
}
setInterval(setTitleToDownload, 250);

//Function to be called every time settings are changed
function loadScheduleSettings() {

	//Keywords for checking homework
	getStorage({homeworkWords: "lektie,forbered"}, function(obj) {
		if (!chrome.runtime.error) {
			homeworkList = stringToList(obj.homeworkWords);
		}
	});

	//Get the homework setting
	var homeworkCheckerInterval;
	getStorage('homework', function (obj) {
		if (!chrome.runtime.error) {
			//If the schedule object exists and the homework setting is true, setup interval to mark
			if (window.location.href.indexOf("skema")) {
				if(obj.homework){
					//Interval to mark homework, they will be marked when they load in
					clearInterval(homeworkCheckerInterval);
					homeworkCheckerInterval = setInterval(function() {
						markHomework();
					}, 250);
				}
			}
		}
	});


	getStorage({toHide: ""}, function(obj) {
		if (!chrome.runtime.error) {
			toHideList = stringToList(obj.toHide);
			setInterval(function() {
				$(".DagMedBrikker>g>g>g:nth-child(2)>text:nth-child(3)").each(function() {
					var toMark = false;
					for (var i=0; i < toHideList.length; i++) {
						if (this.innerHTML.includes(toHideList[i])) toMark = true;
					}

					var adde = $(this).parent().parent();
					if (toMark) {
						if (!adde.hasClass("hiddenLesson")) {
							adde.addClass("hiddenLesson");
						}
					} else {
						if (adde.hasClass("hiddenLesson")) {
							adde.removeClass("hiddenLesson");
						}
					}

				});


			}, 250);
		}
	});


}

loadScheduleSettings();
chrome.storage.onChanged.addListener(function(changes, namespace) {
	//Try to import the theme from the settings storage
	loadScheduleSettings();
});

// <---- HOMEWORK MARKING
//Function for marking the homework
function markHomework(){
	//$(".homeworkLesson").removeClass("homeworkLesson");
	$('.skemaBrikGruppe>g>g>text>title').each(function(index) {
		var toMark = false;
		var arrayLength = homeworkList.length;
		for (var i=0; i < arrayLength; i++) {
			if ($(this).text().toUpperCase().includes(homeworkList[i].toUpperCase())) toMark = true;
		}
		if (toMark) {
			if (!$(this).hasClass("homeworkLesson")) {
				$(this).parent().parent().parent().find('rect').each(function () {
					$(this).addClass("homeworkLesson");
				});
			}
		} else {
			if ($(this).hasClass("homeworkLesson")) {
				$(this).parent().parent().parent().find('rect').each(function () {
					$(this).removeClass("homeworkLesson");
				});
			}
		}
	});
}

//This is just a copy of checkTableIsThere from grades.js. Read the comments by that if you're interested in how this works.
function checkScheduleIsLoaded() {
	//If no schedule blocks are there, we just assume the schedule isn't loaded.
	if ($(".skemaBrikGruppe > g").length > 0) {
		cacheSchedule();
		if (dowToTrigger !== null) {
			openLessonNote(dowToTrigger, timeToTrigger);
		}
	} else {
		window.setTimeout(checkScheduleIsLoaded, 100);
	}
}

//We'll save the schedule HTML so we can serve it to the user when UDDATA is down.
function cacheSchedule() {
	//Generates day in ISO format. This is the format they use in their URLs
	var isoDate = new Date().toISOString().substring(0, 10);
	//Creates a regular expression that matches an URL that ends with either the ISO date, id_skema#, or id_skema.
	var checkDate = new RegExp("(" + isoDate + "|id_skema#|id_skema)" + '$');
	if (window.location.href.match(checkDate)) {
		console.log("Caching schedule");
		//Gets the schedule object
		var scheduleHTML = $($.parseHTML($("svg")[0].outerHTML));

		//Removes the menu buttons, as you can't interact with the schedule anyway
		scheduleHTML.find(".actionMenu").remove();
		//Removes this thing I don't remember what is, but it definitely isn't needed, and storage is expensive
		scheduleHTML.find(".skemaLinieGruppe").parent().remove();
		//Removes the red line, as we don't have the code to move it anymore
		scheduleHTML.find("line").remove();
		//Removes empty skemaBrikGruppe's
		scheduleHTML.find(".skemaBrikGruppe:empty").remove();
		//Removes empty DagMedBrikker's (Makes a lot of sense if the weekends are empty, as they are most of the time, thank God)
		scheduleHTML.find(".DagMedBrikker:empty").remove();


		//Usually, the classes are a third of the way down the schedule, but we don't want that. So first, we find the class with the lowest height
		var minHeight = 10000;
		scheduleHTML.find(".skemaBrikGruppe > g").each(function() {
			var height = $(this)[0].transform.baseVal[0].matrix.f;
			if (height < minHeight) minHeight = height;
		});

		//And then we move all the classes up by the smallest height, moving the first classes to 0.
		scheduleHTML.find(".skemaBrikGruppe > g").each(function() {
			$(this)[0].transform.baseVal[0].matrix.f = $(this)[0].transform.baseVal[0].matrix.f - minHeight;
		});

		//Convert the scheduleHTML object into a string, and save it
		scheduleHTML = scheduleHTML[0].outerHTML;
		setStorage({"cachedSchedule": scheduleHTML }, true);
		//Save the date the schedule was cached.
		var date = new Date();
		isoDate = isoDate + " " + (date.getHours()<10?'0':'') + date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes();
		console.log(isoDate);
		setStorage({"cachedScheduleDate": isoDate }, true);
	}
}

checkScheduleIsLoaded();

var lasttime = "";
var lastdate = "";

//https://j11y.io/javascript/regex-selector-for-jquery/
//Holy shit, I don't know what to think about this. But it works.
//Regex support for jQuery selectors
jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ?
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}

var toCacheFiles = 0;

function cacheFiles() {
	//If the popup is up
	if ($(".control-label").length > 3) {

		//Basically a overly complicated jQuery selector to get the currently selected lesson.
		var markedLesson = $('.skemaBrikGruppe > g:nth-child(1) > rect:regex(class,^(?!(homeworkLesson|lostfocus-svg)))[class]');

		//jQuery selector hell. I am so sorry.
		let time = markedLesson.parent().find("g>text:nth-child(2)").html();
		let teacher = $(".control-group:nth-child(1)").find("input").val();
		let subject = $(".control-group:nth-child(2)").find("input").val();
		let date = $(".control-group:nth-child(3)").find("input").val();
		let files = $(".controls > div > div > div > a[download]");
		if (typeof time === 'undefined') time = timeToTrigger;

		console.assert(time != null);
		console.assert(typeof time !== 'undefined');

		//This is good enough, right?
		if (lasttime !== time || lastdate !== date) {
			lasttime = time;
			lastdate = date;
			files.each(function() {
				let file = $(this).attr("download");
				let url = $(this).attr("href");
				toCacheFiles++;
				chrome.runtime.sendMessage({action: "downloadScheduleFile", date: date, time: time, subject: subject, teacher: teacher, filename: file, url: url}, removeElement);
			});
		}
	}

	//Wait a little bit, try to cache files again.
	window.setTimeout(cacheFiles, 2000);
}

function removeElement() {
	toCacheFiles--;
	if (toCacheFiles == 0 && dowToTrigger !== null) {
		window.close();
	}

}


cacheFiles();

var dispatchMouseEvent = function(target, var_args) {
	var e = document.createEvent("MouseEvents");
	// If you need clientX, clientY, etc., you can call
	// initMouseEvent instead of initEvent
	e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
	target.dispatchEvent(e);
};

function clickOnElement(element) {
	dispatchMouseEvent(element, 'mouseover', true, true);
	dispatchMouseEvent(element, 'mousedown', true, true);
	dispatchMouseEvent(element, 'click', true, true);
	dispatchMouseEvent(element, 'mouseup', true, true);
}

function openLessonNote(dayOfWeek, timeString) {
	var lesson = $(".DagMedBrikker").eq(dayOfWeek).find("text:contains(" + timeString + ")").parent().parent();
	var options = lesson.find(".actionMenu > g > rect");
	var option = options[options.length - 1];
	clickOnElement(option);
	var showNote = $(".icon-file-text-alt");
	clickOnElement(showNote.parent()[0]);
}

dowToTrigger = null;
timeToTrigger = null;

$(document.body).append("<style>.hideLesson { visibility: hidden; }</style>");
