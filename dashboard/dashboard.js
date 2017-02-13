var schedule;

window.onload = function() {
	getStorage("cachedSchedule", true, function(obj) {
		if (!chrome.runtime.error) {
			if (typeof obj.cachedSchedule !== "undefined") {
				//Font awesome, because the schedule depends on that.
				schedule = obj.cachedSchedule;
				getStorage('lang', function(obj) {
					var lang = obj.lang;
					getStorage("cachedScheduleDate", true, function(obj) {
						var date = obj.cachedScheduleDate;
						getStorage("dashboardOnlyHomework", false, function(obj){
							console.log(obj.dashboardOnlyHomework);
							$("#onlyHomeworkBox").prop("checked", obj.dashboardOnlyHomework);
							$("#scheduleCol").html(schedule);
							indexHomework($(schedule), !obj.dashboardOnlyHomework, function(){
								updateHomeworkList();
							});
						});
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
			let homeworkTodoList = obj.homeworkTodoList;
			let days = [
				"Monday", "Tuesday", "Wednesday", "Thursday",
				"Friday", "Saturday", "Sunday"
			];
			getStorage('lang', function (obj) {
				if (!chrome.runtime.error) {
					console.log(obj.lang);
					if(obj.lang === "dansk"){
						days = [
							"mandag", "tirsdag", "onsdag", "torsdag",
							"fredag", "lørdag", "søndag"
						];
					}
				}
				$("#todoList").empty();
				for (var i=0; i<homeworkTodoList.length; i++) {
					$("#todoList").append("<li class=\"list-group-item\"><b>" + homeworkTodoList[i].subject + " - " + days[homeworkTodoList[i].day] + "</b><br /><i>"
					+ homeworkTodoList[i].time + "</i><br />"
					+ homeworkTodoList[i].scheduleText + "</li>");
				}
			});
		}
	})
}

function getXTranspose() {
	return $("svg > .dagMedBrikker:nth-child(3)").attr("transform").match(/-?[\d\.]+/g)[0];
}

function indexHomework(scheduleObject, showAllNotes, callback) {
	console.log(showAllNotes);
	getStorage({homeworkWords: "lektie,forbered"}, function(obj) {

		var homeworkTodoList = [];
		var homeworkKeywords = stringToList(obj.homeworkWords);

		scheduleObject.find('.skemaBrikGruppe > g > g > text').each(function(index) {
			if($(this).attr("y") == 32 && $(this).css("fontSize") === "11px" && $(this).css("fill") !== "rgb(67, 142, 185)"){
				//Regex preservers the line breaks
				let scheduleText = $(this).find("title").text().replace(/\n/g, "<br/>");;
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
		setStorage({"homeworkTodoList": homeworkTodoList}, false, callback);
	});
}

$("#onlyHomeworkBox").on("change", function () {
	console.log("CHANGED");
	setStorage({"dashboardOnlyHomework": this.checked});
	indexHomework($(schedule), !this.checked, function () {
		updateHomeworkList();
	});
});
