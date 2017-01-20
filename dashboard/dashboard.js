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
				//So the x position of a class on Monday is 0. Tuesday is 150. Wednesday is 300. So if we find the transform object, and then find the x position with a regex, and divide it by 150, we get the weekday! (With Monday being 0, Tuesday being 1, etc.)
				var day = $(this).parent().parent().attr("transform").match(/-?[\d\.]+/g)[0]/150;
				homeworkTodoList.push([subject, time, homeworkText, day]);
			}
		});
		setStorage({"homeworkTodoList": homeworkTodoList});
	});
}
