var schedule;

var toHide = [];

var lessonNotes = [];

var entries = null;

getStorage({toHide: ""}, function(obj) {
	if (!chrome.runtime.error) {
		toHide = stringToList(obj.toHide);
	}
});

var lang = 'english';

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message.action == "returnFilesInfo") {
		entries = message.entries;
	} else if (message.action == "downloadScheduleFile") {
		chrome.runtime.sendMessage({action: "requestFile"});
	}
});


//The function FullCalendar uses to fetch calendar evests
function getCalendarEvents(start, end, timezone, callback) {

	var startDay = toCompIsoString(start);
	var endDay = toCompIsoString(end);
	var weekends = false;

	getSchedule(startDay, endDay, function(schedule, message) {
		var events = [];
		lessonNotes = [];
		for (day in schedule) {
			var theDay = schedule[day];
			for (classes in theDay) {
				var theClass = theDay[classes];
				var classObj = {start: theClass['Start'], scrollTo: "#" + theClass['Start'].toString().replace(/\W/g, ""), end: theClass['End'], title: theClass['Name'], description: theClass['Note'], googleFiles: theClass["GoogleFiles"]};

				if (typeof theClass['Note'] !== 'undefined' && theClass['Note'] !== '') {
					classObj['color'] = "orange";
					for (var i=0; i < homeworkList.length; i++) {
						if (theClass['Note'].toUpperCase().includes(homeworkList[i].toUpperCase())) {
							classObj.className = "homeworkLesson";
							classObj['color'] = "red";
						}
					}
					lessonNotes.push([classObj.description, classObj.title, classObj.start, classObj.end, classObj.googleFiles]);
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
		$("#calendar").fullCalendar("option", "weekends", weekends);
		$('#message').html(message);
		lessonNotes.sort(function(a, b) {
			return new Date(a[2]) - new Date(b[2]);
		});

		lessonNotes.forEach(function(item) {
			addNoteToList(item[0], item[1], item[2], item[3], item[4]);
		});
	});
}


window.onload = function() {

	var curtheme = "Default";
	getStorage('theme', function (obj) {
		if (!chrome.runtime.error) {
			curtheme = obj.theme;
			runTheme(curtheme, curPage);
		}
	});
	var curPage = "schedule";
	runTheme();


	$('#calendar').fullCalendar({
		defaultView: "agendaWeek",
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'agendaWeek,agendaDay,listWeek',
		},
		navLinks: true, // can click day/week names to navigate views

		weekNumbers: true,
		weekNumbersWithinDays: true,
		weekNumberCalculation: 'ISO',
		timeFormat: 'H:mm',
		columnFormat: 'ddd D/M',
		slotLabelFormat: 'H:mm',
		minTime: "08:00:00",
		maxTime: "20:00:00",
		height: "auto",
		locale: "en",
		nowIndicator: true,
		eventClick: function(calEvent, jsEvent, view) {
			if (calEvent.scrollTo) {
				$('html, body').animate({
					scrollTop: $(calEvent.scrollTo).offset().top
				}, 200);
			}
		},


		editable: false,
		eventRender: function(event, element) {
			element.qtip({
				content: event.description
			});
		},
		eventLimit: true, // allow "more" link when too many events
		events: function(start, end, timezone, callback) {
			return getCalendarEvents(start, end, timezone, callback);
		}
	});

	getStorage('lang', function(obj) {
		if (!chrome.runtime.error) {
			if (obj.lang == 'dansk') {
				lang = obj.lang
				$('#calendar').fullCalendar('option', 'locale', 'da');
			}
		}
	});


}

function toCompIsoString(date) {
	return date.toISOString().split("T")[0];
}

function addNoteToList (text, subject, start, end, googleFiles) {
	$("#todoList").html("");
	let startDate = new Date(start);
	let day = startDate.getDay() - 1;
	//The .slice(-2) gives us the last 2 characters removing leading zeroes if needed
	let startTime = {
		hour: leadingZeroes(startDate.getHours()),
		minute: leadingZeroes(startDate.getMinutes())
	};

	let endDate = new Date(end);
	let endTime = {
		hour: leadingZeroes(endDate.getHours()),
		minute: leadingZeroes(endDate.getMinutes())
	};

	//Preserve the linebreaks for the html representation
	let htmlText = text.replace(/\n/g, "<br/>");

	let days = [
		"Monday", "Tuesday", "Wednesday", "Thursday",
		"Friday", "Saturday", "Sunday"
	];

	let attachedFiles = "<br>Attached Files: ";

	var homeworkClass = "";
	for (var i=0; i < homeworkList.length; i++) {
		if (text.toUpperCase().includes(homeworkList[i].toUpperCase())) homeworkClass = " homeworkLI";
	}

	if (googleFiles === 0) {
		googleFiles = "";
		attachedFiles = "";
	}

	var startFileName = leadingZeroes(startDate.getUTCDate()) + "." + leadingZeroes(startDate.getUTCMonth() + 1) + "." + startDate.getUTCFullYear() + leadingZeroes(startDate.getHours()) + ":" + leadingZeroes(startDate.getMinutes());

	var fileMatch = RegExp(/^\d\d\.\d\d\.\d\d\d\d\d\d:\d\d-\d\d:\d\d/);
	var entriesToAdd = [];
	entries.forEach(function(entry, i) {
		if (entry.name.includes(startFileName)) {
			entriesToAdd.push(entry);
		}

	});
	var list = "<br><ul>";
	for (i = 0; i < googleFiles; i++) {
		if (i < entriesToAdd.length) {
			var fileName = entries[i].name.replace(fileMatch, "");
			list = list + "<li><a href=" + entriesToAdd[i].url + ">" + fileName + "</a></li>";
		} else {
			list = list + "<li>Please open UDDATA lesson to cache this file</li>";
		}
	}
	list = list + "</ul>";

	//Convert the days to danish if selected by user
	getStorage('lang', function(obj) {
		let lang = obj.lang;
		if (lang === "dansk") {
			days = [
				"mandag", "tirsdag", "onsdag", "torsdag",
				"fredag", "lørdag", "søndag"
			];
			attachedFiles = "<br>Tilknyttede filer: ";
		}

		$("#todoList").append("<li id=\"" + start.toString().replace(/\W/g, "") + "\" class=\"list-group-item" + homeworkClass + "\"><b>" + subject + " - "
			+ days[day] + "</b><br /><i>"
				+ startTime.hour + ":" + startTime.minute + " - "
				+ endTime.hour + ":" + endTime.minute + "</i><br />"
				+ htmlText + "<br><b>" + attachedFiles + googleFiles + "</b>" + list + "</li>");
		setShowOnlyHomework();
	});
}

$("#onlyHomeworkBox").click(setShowOnlyHomework);

function setShowOnlyHomework() {
	if ($("#onlyHomeworkBox").is(":checked")) {
		$("#todoList > li:not(.homeworkLI)").hide();
	} else {
		$("#todoList > li:not(.homeworkLI)").show();
	}
}

$(document).keydown(function(e) {
	if (e.which == 37) {
		$("#calendar").fullCalendar("prev");
	} else if (e.which == 39) {
		$("#calendar").fullCalendar("next");
	}
});

chrome.runtime.sendMessage({action: "requestFile"});
