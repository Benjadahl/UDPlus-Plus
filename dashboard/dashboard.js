var schedule;

var toHide = [];

getStorage({toHide: ""}, function(obj) {
	if (!chrome.runtime.error) {
		toHide = stringToList(obj.toHide);
	}
})

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
			right: '',
		},
		defaultDate: '2017-02-14',
		navLinks: true, // can click day/week names to navigate views

		weekNumbers: true,
		weekNumbersWithinDays: true,
		weekNumberCalculation: 'ISO',
		minTime: "08:00:00",
		maxTime: "20:00:00",
		weekends: false,
		height: "auto",
		locale: "da",

		editable: false,
		eventRender: function(event, element) {
			element.qtip({
				content: event.description
			});
		},
		eventLimit: true, // allow "more" link when too many events
		events: function(start, end, timezone, callback) {
			var startDay = toCompIsoString(start);
			var endDay = toCompIsoString(end);

			getSchedule(startDay, endDay, function(schedule) {

				var events = [];
				for (day in schedule) {
					var theDay = schedule[day];
					for (classes in theDay) {
						var theClass = theDay[classes];
						var classObj = {start: theClass['Start'].toISOString(), end: theClass['End'].toISOString(), title: theClass['Name'], description: theClass['Note']};

						if (typeof theClass['Note'] !== 'undefined') {
							for (var i=0; i < homeworkList.length; i++) {
								if (theClass['Note'].toUpperCase().includes(homeworkList[i].toUpperCase())) {
									classObj['className'] = "homeworkLesson";
									classObj['color'] = "red";
								}
							}
							addNoteToList(classObj.description, classObj.title, classObj.start);
						}

						var hide = false;
						for (var i=0; i < toHide.length; i++) {
							if (theClass['Name'].toUpperCase().includes(toHide[i].toUpperCase())) {
								hide = true;
							}
						}
						if (!hide) events.push(classObj);
					}
				}
				callback(events);


			});

		}
	});
}

function toCompIsoString(date) {
	return date.toISOString().split("T")[0];
}

function addNoteToList (text, subject, time) {
	$("#todoList").html("");
	let date = new Date(time);
	let day = date.getDay() - 1;
	let hour = date.getHours() - 1;
	let minute = date.getMinutes();

	//Preserve the linebreaks for the html representation
	let htmlText = text.replace(/\n/g, "<br/>");

	let days = [
		"Monday", "Tuesday", "Wednesday", "Thursday",
		"Friday", "Saturday", "Sunday"
	];

	var homeworkClass = "";
	for (var i=0; i < homeworkList.length; i++) {
		if (text.toUpperCase().includes(homeworkList[i].toUpperCase())) homeworkClass = " homeworkLI";
	}

	//Convert the days to danish if selected by user
	getStorage('lang', function(obj) {
		let lang = obj.lang;
		if (lang === "dansk") {
			days = [
				"mandag", "tirsdag", "onsdag", "torsdag",
				"fredag", "lørdag", "søndag"
			];
		}

		$("#todoList").append("<li class=\"list-group-item" + homeworkClass + "\"><b>" + subject + " - "
													+ days[day] + "</b><br /><i>"
													+ hour + ":" + minute + "</i><br />"
													+ htmlText + "</li>");
		setShowOnlyHomework();
	});
}

$("#onlyHomeworkBox").click(setShowOnlyHomework);

function setShowOnlyHomework() {
	if ($("#onlyHomeworkBox").is(":checked")) {
		$(".homeworkLI").hide();
	} else {
		$(".homeworkLI").show();
	}

}
