var schedule;

var toHide = [];

//The lesson notes we are rendering on the right side
var lessonNotes = [];

//Set the current page for theming
curPage = "dashboard";

//All files we have in Chrome storage
var entries = null;

//An extraordinarily stupid match we use to get the filename out of files. But it works...
var fileMatch = RegExp(/^\d\d\.\d\d\.\d\d\d\d\d\d:\d\d-\d\d:\d\d/);

//Homework gotta be uniform for storing yo
var homeworkNoteRegex = new RegExp(/(\n|\W|quot|\d|amp)/g);

var hideNotHomework = false;

var fetchFilesAutomatically = false;
function setAutoFetch() {
	var checked = $("#autofetchbox").is(":checked");
	setStorage({'cacheFiles': checked});
	fetchFilesAutomatically = checked;
	rerenderEvents();
}

function loadOptions() {

	//Whetever we want to fetch files automatically
	getStorage('cacheFiles', function(obj) {
		if (!chrome.runtime.error && obj.cacheFiles == true) {
			fetchFilesAutomatically = obj.cacheFiles;
			$("#autofetchbox").prop('checked', fetchFilesAutomatically);
		}
	});

}

loadOptions();
chrome.storage.onChanged.addListener(loadOptions);

$("#autofetchbox").on("click", setAutoFetch);



//When we scroll, we want to stop marking the note we might have scrolled to previously
var currentlySelectedNote = "";
/*
$('#todoList').on('scroll', function() {
	if (currentlySelectedNote != "" && !currentlyScrolling) {
		$(".list-group-item-success").removeClass("list-group-item-success");
		currentlySelectedNote = "";
	}
});*/

getStorage({toHide: ""}, function(obj) {
	if (!chrome.runtime.error) {
		toHide = stringToList(obj.toHide);
	}
});

var lang = 'english';

//Give it a date, and it'll return an unique string for that date, which can also work for a CSS ID
function dateToID(date) {
	return moment(date).toString().replace(/\W/g, "");
}

//To communicate with file storage in background.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message.action == "returnFilesInfo") {
		entries = message.entries;
		rerenderEvents();
		searchUpdate();
	} else if (message.action == "NewFileSaved") {
		chrome.runtime.sendMessage({action: "requestFile"});
	}
});


//The function FullCalendar uses to fetch calendar evests
function getCalendarEvents(start, end, timezone, callback) {

	var startDay = toCompIsoString(start);
	var endDay = toCompIsoString(end);
	var weekends = false;
	var minTime = 8;
	var maxTime = 8;

	getSchedule(startDay, endDay, function(schedule, message) {
		var events = [];
		if (schedule === null) {
			$('#message').html(message);
			callback(events);
		} else {
			for (day in schedule) {
				var theDay = schedule[day];
				for (classes in theDay) {
					var theClass = theDay[classes];
					var classObj = {
						start: theClass['Start'],
						scrollTo: "#" + dateToID(theClass['Start']),
						end: theClass['End'],
						title: theClass['Name'],
						description: theClass['Note'],
						googleFiles: theClass["GoogleFiles"],
						objekt_id: theClass['objekt_id'],
						rooms: theClass['Rooms'],
						teachers: theClass['Teachers'],
					};

					if (Math.floor(theClass['Start'].getHours()) < minTime)
						minTime = Math.floor(theClass['Start'].getHours());

					if (Math.ceil(theClass['End'].getHours())+2 > maxTime)
						maxTime = Math.ceil(theClass['End'].getHours())+2;

					if (theClass['GoogleFiles'] > 0) {
						classObj['color'] = "orange";
						classObj.className = "noteLesson";
					}

					if ((typeof theClass['Note'] !== 'undefined' && theClass['Note'] !== '')) {
						classObj['color'] = "orange";
						classObj.className = "noteLesson";
						for (var i=0; i < homeworkList.length; i++) {
							if (theClass['Note'].toUpperCase().includes(homeworkList[i].toUpperCase())) {
								classObj.className = "homeworkLesson";
								classObj['color'] = "red";
							}
						}
					}


					for (i=0; i<theClass['Rooms'].length; i++) {
						if (theClass['Rooms'][i].toUpperCase().includes("VIRTUEL")) {
							classObj.className = classObj.className + " virtualLesson";
							if (classObj.className.includes("homeworkLesson") || classObj.className.includes("noteLesson")) {
								classObj['color'] = "brown";
							} else {
								classObj['color'] = "green";
							}
						}
					}

					var hide = false;
					for (var i=0; i < toHide.length; i++) {
						if (theClass['Name'].toUpperCase().includes(toHide[i].toUpperCase())) {
							hide = true;
						}
					}
					if (!hide) events.push(classObj);
				}
				var Sunday = moment(endDay);
				if (day === toCompIsoString(Sunday) || day === toCompIsoString(Sunday.subtract(1, 'days'))) weekends = true;
			}
			callback(events);
			$("#calendar").fullCalendar("option", "minTime", minTime + ":00:00");
			$("#calendar").fullCalendar("option", "maxTime", maxTime + ":00:00");
			$("#calendar").fullCalendar("option", "weekends", weekends);
			$('#message').html(message);

		}
	});
}

//Rerender all the notes on the right side. We use lessonNotes to keep track of what we are rendering.
var rendering = false;
function rerenderEvents() {

	if (!rendering) {
		rendering = true;
		lessonNotes = lessonNotes.sort(function(a, b) {
			return a.start - b.start;
		});

		try {
			var toAddHTML = "";
			lessonNotes.forEach(function(item) {
				toAddHTML += toListItem(item['description'], item['title'], item['start'], item['end'], item['googleFiles'], item['objekt_id'], item['rooms'], item['teachers']);
			});
			$("#todoList").html(toAddHTML);

			//Reload homework marking stuff, and add listener
			setShowOnlyHomework();
			$("label > .homeworkCheckbox").click(markDoneHomework);

		} catch (error) {
			//Oh well.
		}
		rendering = false;
	}

}

var baseURL = chrome.runtime.getURL('dashboard/dashboard.html');
function onViewRender(view, element) {
	var viewedDate = $("#calendar").fullCalendar('getDate');
	location.href = baseURL + "#" + toCompIsoString(viewedDate);
}

//When an event is removed from the calendar, we remove it from the lessonNotes list.
function onDestroyEvent(event, element) {
	lessonNotes.forEach(function(item, i) {
		if (item['description'] == event['description'] && item['start'] == event['start'] && item['name'] == event['name']) {
			lessonNotes.splice(i, 1);
		}
	});
}

//When we add an event to the calendar, we want to add the note to the lessonNotes list
function onRenderEvent(event, element) {
	if ((typeof event['description'] !== 'undefined' && event['description'] !== '') || event['googleFiles'] > 0) {
		var toInsert = true;
		lessonNotes.forEach(function(item, i) {
			if (item._id == event._id) {
				toInsert = false;
			}
		});

		if (toInsert) {
			lessonNotes.push(event);
		}

	}
	if ($("#calendar").fullCalendar('getView').type === "agendaWeek") {
		element.append("<section>");
		element.append("<div class='fc-teacher'>" + event['teachers'].toString() + "</div>");
		element.append("<div class='fc-room'>" + event['rooms'].toString() + "</div>");
		element.append("</section>");
		element.attr("title", event['title'] + ", " + event['teachers'].toString() + ", " + event['rooms'].toString());
	}
}

var pleaseOpenUD = "Please open UDDATA+ lesson to cache this file";
var attachedFiles = "<br>Attached Files: ";
var roomsString = 'Rooms: ';
var teachersString = 'Teachers: ';
var homeworkDoneText = "Homework done";

var currentlyScrolling = false;
function scrollToNote(id) {
	if (true) {
		$('#todoList').stop(true, true);
		currentlySelectedNote = id;
		currentlyScrollling = true;
		$(".list-group-item-success").removeClass("list-group-item-success");
		$(id).addClass("list-group-item-success");
		$('#todoList').animate({
			scrollTop: $(id).offset().top - $("#todoList > li:first").offset().top
		}, 200);
		setTimeout(function() {
			currentlyScrollling = false;
		}, 500);
	}
}


//Init when we load the window
window.onload = function() {

	getStorage('customTheme', function (obj) {
		if (!chrome.runtime.error) {
			customTheme = obj.customTheme;
		}
	});

	var curtheme = "default";
	getStorage('theme', function (obj) {
		if (!chrome.runtime.error) {
			if (typeof obj.theme !== 'undefined')
				curtheme = obj.theme;

			runTheme(curtheme, curPage);
		}
	});
	getStorage('hideFileDisclaimer', function(obj) {
		if (!chrome.runtime.error) {
			if (obj.hideFileDisclaimer) {
				$("#disclaimer").hide();
			}
		}
	});
	runTheme();

	var currentURL = location.href.split("#");
	var defaultDate = moment();
	if (typeof currentURL[1] !== 'undefined') {
		defaultDate = moment((currentURL[1]));
	}

	//Initialize our fullCalendar thing
	$('#calendar').fullCalendar({
		defaultView: "agendaWeek",
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'agendaWeek,agendaDay,listWeek',
		},
		navLinks: true, // can click day/week names to navigate views

		weekNumbers: true,
		defaultDate: defaultDate,
		weekNumbersWithinDays: true,
		weekNumberCalculation: 'ISO', //ISO standard best standard
		timeFormat: 'H:mm',
		columnFormat: 'ddd D/M',
		slotLabelFormat: 'H:mm',
		minTime: "08:00:00",
		maxTime: "20:00:00",
		height: "auto",
		locale: "en",
		nowIndicator: true, //Red line at current time
		eventClick: function(calEvent, jsEvent, view) {
			//Scroll to event on click
			if (typeof $(calEvent.scrollTo).html() !== 'undefined') {
				scrollToNote(calEvent.scrollTo);
			}
		},


		editable: false, //Of course we don't want people editing the calendar
		viewRender: function(view, element) {
			onViewRender(view, element);
		},
		eventRender: function(event, element) {
			onRenderEvent(event, element);
		},
		eventDestroy: function(event, element, view) {
			onDestroyEvent(event, element);
		},
		eventAfterAllRender: function(view, element) {
			rerenderEvents();
		},
		eventLimit: true, // allow "more" link when too many events
		events: function(start, end, timezone, callback) {
			//Register our event getter we defined earlier
			return getCalendarEvents(start, end, timezone, callback);
		}
	});

	getStorage('hideNotHomework', function(obj) {
		if (!chrome.runtime.error) {
			$("#onlyHomeworkBox").prop('checked', obj.hideNotHomework);
			setShowOnlyHomework();
			hideNotHomework = obj.hideNotHomework;
		}
	});


	$("#closeModal").click(function() {
		setStorage({"dashboardInfoShown": true});
	});

	getStorage('dashboardInfoShown', function(obj) {
		if (!obj.dashboardInfoShown) {
			$("#myModal").modal();
		}
	});

	//Language stuff
	getStorage('lang', function(obj) {
		if (!chrome.runtime.error) {
			if (obj.lang == 'dansk') {
				lang = obj.lang
				$('#searchHeader').text("Lektionsfiler");
				//$('#searchBox').attr("placeholder", "Søg filer");
				$('#disclaimer').text("Læg venligst mærke til at dette kun er de filer som vi har gemt. Filer bliver kun gemt når du går ind på en lektion i uddata's skema. Tryk for at skjule den her besked.");
				$('#todo').text("Lektionsnoter");
				$('#onlyHomeworkText').text("Vis kun ulavede lektier");
				$('#autofetchtext').text("Hent automatisk lektionsfiler");
				$('#modal-body').text("Velkommen til det nye UD++ Dashboard! Den her side lader dig nemt se dit skema, holde styr på dine lektier, og nemt få adgang til filer fra lektioner. Og alt det her virker når UDDATA er nede, eller du er offline, blot du har set den del af skemaet en gang før. Du kan altid få adgang til den her side igen ved at klikke på UD++ ikonet i øverste højre hjørne. Hyg dig!");

				attachedFiles = "<br>Tilknyttede filer: ";
				pleaseOpenUD = "Åben UDDATA+ for at cache den her fil.";
				homeworkDoneText = "Lektie lavet";
				roomsString = "Lokaler: ";
				teachersString = "Lærere: ";

				//This next line throws an error for some reason, and to be honest, I don't want to figure out why. It still works though. Just like the rest of javascript :-)
				try {
					$('#calendar').fullCalendar('option', 'locale', 'da');
				} catch (error) {
					//I don't know what to do with this error. Let's just ignore it.
				}
			}
		}
	});


}

function toCompIsoString(date) {
	return date.toISOString().split("T")[0];
}

var lessonsCaching = [];

function toListItem(text, subject, start, end, googleFiles, objekt_id, rooms, teachers) {
	let startDate = new Date(start);
	let day = startDate.getDay();
	//The .slice(-2) gives us the last 2 characters removing leading zeroes if needed
	let startTime = {
		hour: leadingZeroes(startDate.getHours()),
		minute: leadingZeroes(startDate.getMinutes())
	};

	if (text == null || typeof text === 'undefined' || text == '') text = '';

	let endDate = new Date(end);
	let endTime = {
		hour: leadingZeroes(endDate.getHours()),
		minute: leadingZeroes(endDate.getMinutes())
	};

	//Preserve the linebreaks for the html representation
	let htmlText = text.replace(/\n/g, "<br/>");

	htmlText = linkifyHtml(htmlText, { defaultProtocol: 'https' });

	htmlText = "<div class='note'>" + htmlText + "</div>";

	let pleaseOpenUD = "Please open UDDATA+ lesson to cache this file";
	let attachedFiles = "<br>Attached Files: ";
	var homework = false;
	let roomsString = 'Rooms: ';
	let teachersString = 'Teachers: ';

	//Check if the lesson matches our homework thing
	var homeworkClass = "";
	for (var i=0; i < homeworkList.length; i++) {
		if (text.toUpperCase().includes(homeworkList[i].toUpperCase())) {
			homeworkClass = " homeworkLI";
			homework = true;
		}
	}

	if (googleFiles === 0) {
		googleFiles = "";
		attachedFiles = "";
	}

	var startFileName = leadingZeroes(startDate.getUTCDate()) + "." + leadingZeroes(startDate.getUTCMonth() + 1) + "." + startDate.getUTCFullYear() + leadingZeroes(startDate.getHours()) + ":" + leadingZeroes(startDate.getMinutes());

	var entriesToAdd = [];
	entries.forEach(function(entry, i) {
		if (entry.name.includes(startFileName)) {
			entriesToAdd.push(entry);
		}

	});

	var homeworkCheckbox = "<label> <input type='checkbox' class='homeworkCheckbox'> " + homeworkDoneText + " </label>";

	if (homework) {
		var testHomeworkString = text.replace(homeworkNoteRegex, "").hashCode();

		var homeworkDone = false;
		for (i = 0; i < doneHomework.length; i++) {
			if (doneHomework[i] === testHomeworkString) homeworkDone = true;
		}
		if (homeworkDone) {
			homeworkClass = "";
			homeworkCheckbox = "<label> <input type='checkbox' class='homeworkCheckbox' checked> " + homeworkDoneText + " </label>";
		}
	}

	var times = startTime.hour + ":" + startTime.minute + "-" + endTime.hour + ":" + endTime.minute;
	var list = "<br><ul>";
	for (i = 0; i < googleFiles; i++) {
		if (i < entriesToAdd.length) {
			var fileName = entriesToAdd[i].name.replace(fileMatch, "");
			list = list + "<li><a target='_blank' href=" + entriesToAdd[i].url + ">" + fileName + "</a></li>";
		} else {
			var uddatalink = "https://www.uddataplus.dk/skema/?id=id_skema#u:e!" + objekt_id + "!" + toCompIsoString(startDate);
			list = list + "<li><a target='_blank' href='" + uddatalink + "'>" + pleaseOpenUD + "</a></li>";

			if (!contains(lessonsCaching, dateToID(start)) && fetchFilesAutomatically) {
				chrome.tabs.create({
					url: uddatalink,
					active: false,
				}, function(tab) {
					chrome.tabs.executeScript(tab.id, {code: "dowToTrigger = " + (day-1) + "; timeToTrigger = '" + times + "';"});
				});
				lessonsCaching.push(dateToID(start));
			}

		}
	}
	list = list + "</ul>";

	//Woops, turns out we didn't have any files. Get rid of everything.
	if (typeof googleFiles === 'undefined' || googleFiles === 0 || googleFiles === '') {
		attachedFiles = '';
		list = '';
	}

	if (!homework) homeworkCheckbox = "";






	//Append a beautiful object to our list
	var string = "<li id=\"" + dateToID(start) + "\" class=\"list-group-item" + homeworkClass + "\"><b>" + subject + " - "
	+ weekDays[day] + "</b><br /><i>"
	+ startTime.hour + ":" + startTime.minute + " - "
	+ endTime.hour + ":" + endTime.minute + "</i><br />"
	+ roomsString + rooms.toString() + "<br>"
	+ teachersString + teachers.toString() + "<br>"
	+ htmlText + "<br>" + homeworkCheckbox + "<br><b>" + attachedFiles + googleFiles + "</b>" + list + "</li>";

	return string;



}

var doneHomework = null;
getStorage("doneHomework", function(obj) {
	if (!chrome.runtime.error) {
		doneHomework = obj.doneHomework;
		if (typeof doneHomework === 'undefined') doneHomework = [];
		window.setInterval(saveDoneHomework, 10000);
	}
});

function saveDoneHomework() {
	setStorage({"doneHomework": doneHomework});
	debugLog("Homework saved");
}

window.addEventListener("beforeunload", function(e) {
	saveDoneHomework();
});


//The function to be called when a lesson is clicked.
function markDoneHomework() {
	var note = $(this).parent().parent().find(".note").text();
	note = note.replace(homeworkNoteRegex, "").hashCode();
	var checked = ($(this).is(":checked"));
	if (!checked) {
		$(this).parent().parent().addClass("homeworkLI");
	} else {
		$(this).parent().parent().removeClass("homeworkLI");
	}

	var alreadyAdded = false;
	for (i = 0; i < doneHomework.length; i++) {
		if (doneHomework[i] === note) {
			alreadyAdded = true;
			if (!checked) {
				doneHomework.splice(i, 1)
			}
		}
	}
	if (!alreadyAdded && checked) doneHomework.push(note);
	setShowOnlyHomework();
}

$("#onlyHomeworkBox").click(setShowOnlyHomework);

function setShowOnlyHomework() {
	if ($("#onlyHomeworkBox").is(":checked")) {
		$("#todoList > li:not(.homeworkLI)").hide();
		if (!hideNotHomework) setStorage({hideNotHomework: true}); hideNotHomework = true;
	} else {
		$("#todoList > li:not(.homeworkLI)").show();
		if (hideNotHomework) setStorage({hideNotHomework: false}); hideNotHomework = false;
	}
}

function scrollOffset(offset) {
	if (lessonNotes.length !== 0) {

		if ($(currentlySelectedNote).length == 0) currentlySelectedNote = "";
		if (currentlySelectedNote == "") {
			currentlySelectedNote = lessonNotes[lessonNotes.length-1].scrollTo;
		}

		var done = false;
		lessonNotes.forEach(function(item, i) {
			if (item.scrollTo == currentlySelectedNote && !done) {
				toIndex = i+offset;
				if (toIndex < 0) toIndex = lessonNotes.length-1;
				if (toIndex > lessonNotes.length-1) toIndex = 0;
				var note = $(lessonNotes[toIndex].scrollTo);
				var attempts = 0;
				while ((note.css('display') == 'none' || note.length == 0) && attempts < 50) {
					toIndex += offset;
					attempts++;
					if (toIndex < 0) toIndex = lessonNotes.length-1;
					if (toIndex > lessonNotes.length-1) toIndex = 0;
					note = $(lessonNotes[toIndex].scrollTo);
				}
				scrollToNote(lessonNotes[toIndex].scrollTo);
				done = true;
			}
		});
	}
}

function openSelectedFile(number) {
	$(".list-group-item-success>ul>li:nth-child(" + number + ")>a")[0].click();
}

//On right and left arrow key, switch day/week/whatever
$(document).keydown(function(e) {
	if (!$("#searchBox").is(":focus")) {
		if (e.which == 37) {
			$("#calendar").fullCalendar("prev");
		} else if (e.which == 39) {
			$("#calendar").fullCalendar("next");
		} else if (e.which == 76) {
			$("#onlyHomeworkBox").prop("checked", !$("#onlyHomeworkBox").prop("checked"));
			setShowOnlyHomework();
		} else if (e.which == 38 || e.which == 75) {
			//UP
			scrollOffset(-1);
		} else if (e.which == 40 || e.which == 74) {
			//DOWN
			scrollOffset(1);
		} else if (e.which > 48 && e.which < 58) {
			//Number row
			openSelectedFile(e.which - 48);
		} else if (e.which > 96 && e.which < 106) {
			//Numpad
			openSelectedFile(e.which - 96);
		} else if (e.which == 219) {
			//Progremmer dvorak here
			openSelectedFile(2);
		} else if (e.which == 222) {
			openSelectedFile(3);
		} else if (e.which == 191) {
			openSelectedFile(4);
		} else if (e.which == 187) {
			openSelectedFile(6);
		} else if (e.which == 83) {
			$("#searchBox").focus();
			window.setTimeout(function() {
				$("#searchBox").val("");
				searchUpdate();
			}, 1);
		}
	}
});

function openSearchResult(number) {
	$("#searchResults > li:nth-child(" + number + ") > a")[0].click();
}

$("#searchBox").keydown(function(e) {
	if (e.which == 13) {
		console.log("Ayy");
		var searchResults = $("#searchResults > li");
		if (searchResults.length === 1) {
			openSearchResult(1);
		}
	} else if (e.which > 48 && e.which < 58) {
		openSearchResult(e.which - 48);
	} else if (e.which > 96 && e.which < 106) {
		openSearchResult(e.which - 96);
	} else if (e.which == 219) {
		//Progremmer dvorak here
		openSearchResult(2);
	} else if (e.which == 222) {
		openSearchResult(3);
	} else if (e.which == 191) {
		openSearchResult(4);
	} else if (e.which == 187) {
		openSearchResult(6);
	} else if (e.which == 27) {
		//Reimplement escape button
		$("#searchBox").blur();
	}
});

//Updating the search box on the left
function searchUpdate() {
	var searchQuery = $("#searchBox").val();

	var list = "";
	if (searchQuery == "") {
		entries.forEach(function(entry, i) {
			var fileName = entry.name.replace(fileMatch, "");
			list = list + "<li class='list-group-item'><a target='_blank' href=" + entry.url + ">" + fileName + "</a></li>";
		});
	} else {
		entries.forEach(function(entry, i) {
			var fileName = entry.name.replace(fileMatch, "");
			if (fileName.toUpperCase().includes(searchQuery.toUpperCase())) {
				fileName = fileName.replace(new RegExp("(" + searchQuery + ")", 'ig'), '<b>$1</b>');
				list = list + "<li class='list-group-item'><a target='_blank' href=" + entry.url + ">" + fileName + "</a></li>";
			}
		});

	}

	document.getElementById("searchResults").innerHTML = list;
}

$("#searchBox").bind('input', searchUpdate);

$("#disclaimer").click(function() {
	$("#disclaimer").hide();
	setStorage({'hideFileDisclaimer': true});
});

//Ask the background.js script to fetch us the until now stored files
chrome.runtime.sendMessage({action: "requestFile"});
