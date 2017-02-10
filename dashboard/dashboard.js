window.onload = function() {
	getStorage("cachedSchedule", true, function(obj) {
		if (!chrome.runtime.error) {
			if (typeof obj.cachedSchedule !== "undefined") {
				//Font awesome, because the schedule depends on that.
				var schedule = obj.cachedSchedule;
				getStorage('lang', function(obj) {
					var lang = obj.lang;
					getStorage("cachedScheduleDate", true, function(obj) {
						var date = obj.cachedScheduleDate;
						indexHomework($(schedule), true);
						$("#scheduleCol").html(schedule);
						updateHomeworkList();

					});
				});
			}
		}

	});

	var curtheme = "Default";
	getStorage('theme', function (obj) {
		if (!chrome.runtime.error) {
			curtheme = obj.theme;
			console.log("loaded curtheme");
			runTheme(curtheme, curPage);
		}
	});
	var curPage = "schedule";
	runTheme();
}

function updateHomeworkList() {
	getStorage('homeworkTodoList', function(obj) {
		if (!chrome.runtime.error) {
			var homeworkTodoList = obj.homeworkTodoList;
			for (var i=0; i<homeworkTodoList.length; i++) {
				$("#todoList").append("<li class=\"list-group-item\"><b>" + homeworkTodoList[i].subject + "</b> den " + homeworkTodoList[i].day +  "<br />" + homeworkTodoList[i].scheduleText + "</li>");
			}
		}
	})
}

function getXTranspose() {
	return $("svg > .dagMedBrikker:nth-child(3)").attr("transform").match(/-?[\d\.]+/g)[0];
}

function indexHomework(scheduleObject, showAllNotes) {
	getStorage({homeworkWords: "lektie,ferbered"}, function(obj) {

		var homeworkTodoList = [];
		var homeworkKeywords = stringToList(obj.homeworkWords);

		scheduleObject.find('.skemaBrikGruppe > g > g > text').each(function(index) {
			if($(this).attr("y") == 32 && $(this).css("fontSize") === "11px" && $(this).css("fill") !== "rgb(67, 142, 185)"){
				let scheduleText = $(this).find("title").text();
				let containsHomework = false;

				if(!showAllNotes){
					for (var i = 0; i < homeworkKeywords.length; i++) {
						if(scheduleText.toUpperCase().includes(homeworkKeywords[i].toUpperCase())){
							containsHomework = true;
						}
					}
				}

				if(scheduleText !== "" && (containsHomework || showAllNotes)){
					let brick = $(this).parent().parent();

					let subject = $(brick).find(" g > text")[1].innerHTML;
					let time = $(brick).find("g > text")[0].innerHTML;
					//The XTranspose is how much every day is moved to the right. If we divide the x position with xTranspose, we get the weekday.
					let xTranspose = getXTranspose();
					let day = $(brick).parent().parent().attr("transform").match(/-?[\d\.]+/g)[0]/xTranspose;

					homeworkTodoList.push({subject: subject, time: time, scheduleText: scheduleText, day: day});
				}
			}
		});
		setStorage({"homeworkTodoList": homeworkTodoList});
	});
}
