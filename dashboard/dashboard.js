var schedule;

var toHide = [];

var lessonNotes = [];

var entries = null;

var noteSelected = false;

//An extraordinarily stupid match we use to get the filename out of files. But it works...
var fileMatch = RegExp(/^\d\d\.\d\d\.\d\d\d\d\d\d:\d\d-\d\d:\d\d/);

//Homework gotta be uniform for storing yo
var homeworkNoteRegex = new RegExp(/(\n|\W|quot|\d|amp)/g);

window.onscroll = function() {
	if (noteSelected) {
		$(".list-group-item-success").removeClass("list-group-item-success");
		noteSelected = false;
	}
}

getStorage({toHide: ""}, function(obj) {
	if (!chrome.runtime.error) {
		toHide = stringToList(obj.toHide);
	}
});

var lang = 'english';

function dateToID(date) {
	return moment(date).toString().replace(/\W/g, "");
}

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

	getSchedule(startDay, endDay, function(schedule, message) {
		var events = [];
		for (day in schedule) {
			var theDay = schedule[day];
			for (classes in theDay) {
				var theClass = theDay[classes];
				var classObj = {start: theClass['Start'], scrollTo: "#" + dateToID(theClass['Start']), end: theClass['End'], title: theClass['Name'], description: theClass['Note'], googleFiles: theClass["GoogleFiles"], objekt_id: theClass['objekt_id']};

				if (typeof theClass['Note'] !== 'undefined' && theClass['Note'] !== '') {
					classObj['color'] = "orange";
					for (var i=0; i < homeworkList.length; i++) {
						if (theClass['Note'].toUpperCase().includes(homeworkList[i].toUpperCase())) {
							classObj.className = "homeworkLesson";
							classObj['color'] = "red";
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
		$("#calendar").fullCalendar("option", "weekends", weekends);
		$('#message').html(message);

	});
}

function rerenderEvents() {
	$("#todoList").html("");

	lessonNotes = lessonNotes.sort(function(a, b) {
		return a.start - b.start;
	});

	lessonNotes.forEach(function(item) {
		addNoteToList(item['description'], item['title'], item['start'], item['end'], item['googleFiles'], item['objekt_id']);
	});

}

function onDestroyEvent(event, element) {
	lessonNotes.forEach(function(item, i) {
		if (item['description'] == event['description']) {
			lessonNotes.splice(i, 1);
		}
	});
}

function onRenderEvent(event, element) {
	if (typeof event['description'] !== 'undefined' && event['description'] !== '') {
		var toInsert = true;
		lessonNotes.forEach(function(item, i) {
			if (item[0] == event['description']) {
				toInsert = false;
			}
		});

		if (toInsert) lessonNotes.push(event);

	}
}


window.onload = function() {

	var curtheme = "Default";
	getStorage('theme', function (obj) {
		if (!chrome.runtime.error) {
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
			if (typeof $(calEvent.scrollTo).html() !== 'undefined') {
				$(".list-group-item-success").removeClass("list-group-item-success");
				noteSelected = false;
				$(calEvent.scrollTo).addClass("list-group-item-success");
				$('html, body').animate({
					scrollTop: $(calEvent.scrollTo).offset().top
				}, 200);
				setTimeout(function() {
					noteSelected = true;
				}, 500);
			}
		},


		editable: false,
		eventRender: function(event, element) {
			element.qtip({
				content: event.description
			});
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
			return getCalendarEvents(start, end, timezone, callback);
		}
	});

	getStorage('lang', function(obj) {
		if (!chrome.runtime.error) {
			if (obj.lang == 'dansk') {
				lang = obj.lang
				$('#searchHeader').text("Lektionsfiler");
				//$('#searchBox').attr("placeholder", "Søg filer");
				$('#disclaimer').text("Læg venligst mærke til at dette kun er de filer som vi har gemt. Filer bliver kun gemt når du går ind på en lektion i uddata's skema. Tryk for at skjule den her besked.");
				$('#todo').text("Lektionsnoter");
				$('#onlyHomeworkText').text("Vis kun ulavede lektier");
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


function addNoteToList (text, subject, start, end, googleFiles, objekt_id) {
	let startDate = new Date(start);
	let day = startDate.getDay();
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

	htmlText = linkifyHtml(htmlText, { defaultProtocol: 'https' });

	htmlText = "<div class='note'>" + htmlText + "</div>";

	let pleaseOpenUD = "Please open UDDATA+ lesson to cache this file";
	let attachedFiles = "<br>Attached Files: ";
	var homework = false;

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

	//Convert the days to danish if selected by user
	getStorage('lang', function(obj) {
		let lang = obj.lang;
		var homeworkDoneText = "Homework done";
		if (lang === "dansk") {
			attachedFiles = "<br>Tilknyttede filer: ";
			pleaseOpenUD = "Åben UDDATA+ for at cache den her fil.";
			homeworkDoneText = "Lektie lavet";
		}

		getStorage('doneHomework', true, function(obj) {

			var homeworkCheckbox = "<label> <input type='checkbox' class='homeworkCheckbox'> " + homeworkDoneText + " </label>";

			if (homework) {
				var testHomeworkString = text.replace(homeworkNoteRegex, "");


				var doneHomework = obj.doneHomework;
				if (typeof doneHomework === 'undefined') {
					doneHomework = [];
				}
				var homeworkDone = false;
				for (i = 0; i < doneHomework.length; i++) {
					if (doneHomework[i] === testHomeworkString) homeworkDone = true;
				}
				if (homeworkDone) {
					homeworkClass = "";
					homeworkCheckbox = "<label> <input type='checkbox' class='homeworkCheckbox' checked> " + homeworkDoneText + " </label>";
				}
			}



			var list = "<br><ul>";
			for (i = 0; i < googleFiles; i++) {
				if (i < entriesToAdd.length) {
					var fileName = entriesToAdd[i].name.replace(fileMatch, "");
					list = list + "<li><a href=" + entriesToAdd[i].url + ">" + fileName + "</a></li>";
				} else {
					var uddatalink = "https://www.uddataplus.dk/skema/?id=id_skema#u:e!" + objekt_id + "!" + toCompIsoString(startDate);
					list = list + "<li><a href='" + uddatalink + "'>" + pleaseOpenUD + "</a></li>";
				}
			}
			list = list + "</ul>";

			//Woops, turns out we didn't have any files. Get rid of everything.
			if (typeof googleFiles === 'undefined' || googleFiles === 0 || googleFiles === '') {
				attachedFiles = '';
				list = '';
			}



			if (!homework) {
				homeworkCheckbox = "";
			}


			$("#todoList").append("<li id=\"" + dateToID(start) + "\" class=\"list-group-item" + homeworkClass + "\"><b>" + subject + " - "
														+ weekDays[day] + "</b><br /><i>"
														+ startTime.hour + ":" + startTime.minute + " - "
														+ endTime.hour + ":" + endTime.minute + "</i><br />"
														+ htmlText + "<br>" + homeworkCheckbox + "<br><b>" + attachedFiles + googleFiles + "</b>" + list + "</li>");
														setShowOnlyHomework();
														$("#" + dateToID(start) + " > label > .homeworkCheckbox").click(markDoneHomework);

		})

	});
}

function markDoneHomework() {
	var note = $(this).parent().parent().find(".note").text();
	note = note.replace(homeworkNoteRegex, "");
	var checked = ($(this).is(":checked"));
	if (!checked) {
		$(this).parent().parent().addClass("homeworkLI");
	} else {
		$(this).parent().parent().removeClass("homeworkLI");
	}

	getStorage("doneHomework", true, function(object) {
		var doneHomework = object.doneHomework;
		if (typeof doneHomework === 'undefined') {
			doneHomework = [];
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
		setStorage({"doneHomework": doneHomework}, true);
	})
	setShowOnlyHomework();
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

function searchUpdate() {
	var searchQuery = $("#searchBox").val();

	var list = "";
	if (searchQuery == "") {
		entries.forEach(function(entry, i) {
			var fileName = entry.name.replace(fileMatch, "");
			list = list + "<li class='list-group-item'><a href=" + entry.url + ">" + fileName + "</a></li>";
		});
	} else {
		entries.forEach(function(entry, i) {
			var fileName = entry.name.replace(fileMatch, "");
			if (fileName.toUpperCase().includes(searchQuery.toUpperCase())) {
				fileName = fileName.replace(new RegExp("(" + searchQuery + ")", 'ig'), '<b>$1</b>');
				list = list + "<li class='list-group-item'><a href=" + entry.url + ">" + fileName + "</a></li>";
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

chrome.runtime.sendMessage({action: "requestFile"});
