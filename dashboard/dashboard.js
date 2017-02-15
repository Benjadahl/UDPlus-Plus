var schedule;

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
				var maxTime = 0;
				var hiddenDays = [1, 2, 3, 4, 5, 6, 7];
				for (day in schedule) {
					for (var i = 0; i < hiddenDays.length; i++) {
						if (new Date(day).getDay() == hiddenDays[i]) hiddenDays.splice(i);
					}
					var theDay = schedule[day];
					for (classes in theDay) {
						var theClass = theDay[classes];
						var classObj = {start: theClass['Start'].toISOString(), end: theClass['End'].toISOString(), title: theClass['Name'], description: theClass['Note']};

						if (typeof theClass['Note'] !== 'undefined') {
							for (var i=0; i < homeworkList.length; i++) {
								if (theClass['Note'].toUpperCase().includes(homeworkList[i].toUpperCase())) {
									classObj['className'] = "homeworkLesson";
									classObj['color'] = "red";
                  addNoteToList(classObj.description, classObj.title, classObj.start);
								}
							}
						}

						var end = theClass['End'];
						end = end.getHours() * 60 + end.getMinutes();
						if (end > maxTime) maxTime = end;
						events.push(classObj);
					}
				}

				//$("#calendar").fullCalendar("option", "hiddenDays", hiddenDays);

				var h = Math.floor(maxTime / 60);
				var s = maxTime % 60;
				maxTime = h + ":" + s + ":00";
				//$("#calendar").fullCalendar("option", "maxTime", maxTime);
				callback(events);


			});

		}
	});
}

function toCompIsoString(date) {
	return date.toISOString().split("T")[0];
}

function addNoteToList (text, subject, time) {
  let date = new Date(time);
  let day = date.getDay();
  let hour = date.getHours() - 1;
  let minute = date.getMinutes();

  //Preserve the linebreaks for the html representation
  let htmlText = text.replace(/\n/g, "<br/>")

  let days = [
    "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday", "Sunday"
  ];

  //Convert the days to danish if selected by user
  getStorage('lang', function(obj) {
    let lang = obj.lang;
    if (lang === "dansk") {
      days = [
        "mandag", "tirsdag", "onsdag", "torsdag",
        "fredag", "lørdag", "søndag"
      ];
    }

    $("#todoList").append("<li class=\"list-group-item\"><b>" + subject + " - "
    + days[day] + "</b><br /><i>"
    + hour + ":" + minute + "</i><br />"
    + htmlText + "</li>");
  });
}

/*
	 $("#onlyHomeworkBox").on("change", function () {
	 setStorage({"dashboardOnlyHomework": this.checked});
	 indexHomework($(schedule), !this.checked, function () {
	 updateHomeworkList();
	 });
	 });
	 */
