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
						indexHomework($(schedule));
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
				console.log(homeworkTodoList[i][0]);
				$("#todoList").append("<li class=\"list-group-item\">" + homeworkTodoList[i][0] + " den " + homeworkTodoList[i][3] +  "</li>");
			}
		}
	})
}

function getXTranspose() {
	return $("svg > .dagMedBrikker:nth-child(3)").attr("transform").match(/-?[\d\.]+/g)[0];
}

function indexHomework(scheduleObject) {
	getStorage({homeworkWords: "lektie,ferbered"}, function(obj) {
		var homeworkTodoList = [];
		var homeworkList = stringToList(obj.homeworkWords);
		scheduleObject.find('.skemaBrikGruppe>g').each(function(index) {
			var homeworkText = $(this).find("g>text>title");
			var toMark = false;
			var arrayLength = homeworkList.length;
			for (var i=0; i < arrayLength; i++) {
				if ($(homeworkText).text().toUpperCase().includes(homeworkList[i].toUpperCase())) toMark = true;
			}
			if (toMark) {
				var subject = $(this).find("g > text")[1].innerHTML;
				var time = $(this).find("g > text")[0].innerHTML;
				var homeworkText = $(this).find("g > text")[5].innerHTML;
				//The XTranspose is how much every day is moved to the right. If we divide the x position with xTranspose, we get the weekday.
				var xTranspose = getXTranspose();
				var day = $(this).parent().parent().attr("transform").match(/-?[\d\.]+/g)[0]/xTranspose;
				homeworkTodoList.push([subject, time, homeworkText, day]);
			}
		});
		setStorage({"homeworkTodoList": homeworkTodoList});
	});
}
