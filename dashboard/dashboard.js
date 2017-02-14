var schedule;

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0,0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getFullYear(), weekNo];
}

var week = getWeekNumber(new Date())[1];

window.onload = function() {
	/*
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
	*/

	var curtheme = "Default";
	getStorage('theme', function (obj) {
		if (!chrome.runtime.error) {
			curtheme = obj.theme;
			runTheme(curtheme, curPage);
		}
	});
	var curPage = "schedule";
	runTheme();
	loadSchedule(week, 2017);
}

Date.prototype.addDays = function(days) {
	var dat = new Date(this.valueOf());
	dat.setDate(dat.getDate() + days);
	return dat;
}

function getDateOfISOWeek(weekNumber,year){
	//Create a date object starting january first of chosen year, plus the number of days in a week multiplied by the week number to get the right date.
	return new Date(year, 0, 1+((weekNumber-1)*7));
}

function getDateOfISOWeek(week, year) {
	var d = new Date("Jan 01, "+year+" 01:00:00");
	var w = d.getTime() + 604800000 * (week-1);
	var n1 = new Date(w);
	return n1.addDays(1);

}


function toCompIsoString(date) {
	return date.toISOString().split("T")[0];
}

//Takes a date and returns HH:MM
function dateToTime(date) {
	var hours = String(date.getHours());
	if (hours.length == 1) hours = "0" + hours;
	var minutes = String(date.getMinutes());
	if (minutes.length == 1) minutes = "0" + minutes;
	return (hours + ":" + minutes);
}

function loadSchedule(week, year) {
	var startDate = getDateOfISOWeek(week, year);
	var startDay = toCompIsoString(startDate);
	console.log(startDay);
	var endDay = toCompIsoString(startDate.addDays(5));
	console.log(endDay);

	getSchedule(startDay, endDay, function(schedule) {
		console.log(schedule);
		var times = [];
		for (day in schedule) {
			for (classes in schedule[day]) {
				var time = schedule[day][classes]["Start"].getHours() + ":" + schedule[day][classes]["Start"].getMinutes();
				var test = false;
				for (i = 0; i < times.length; i++) {
					if (time === times[i]) {
						test = true;
					}
				}

				if (!test) times.push(time);
			}
		}
		times = ["08:15-09:15", "09:20-10:20", "10:30-11:30", "12:00-13:00", "13:10-14:10", "14:15-15:15", "15:20-16:20"];
		var scheduleHTML = "";
		for (time in times) {
			var weekdays = ["", "", "", "", ""];
			for (i = 0; i < 5; i++) {
				var todayString = toCompIsoString(startDate.addDays(i));
				if (typeof schedule[todayString] !== "undefined") {
					for (ii= 0; ii< Object.keys(schedule[todayString]).length; ii++) {
						if (times[time] === dateToTime(schedule[todayString][ii]["Start"]) + "-" + dateToTime(schedule[todayString][ii]["End"])) {
							weekdays[i] = schedule[todayString][ii]["Name"];
						}
					}
				}
			}
			scheduleHTML += "<tr>";
			scheduleHTML += "<td>" + times[time] + "</td>";
			scheduleHTML += "<td rowspan='1'>" + weekdays[0] + "</td>";
			scheduleHTML += "<td rowspan='1'>" + weekdays[1] + "</td>";
			scheduleHTML += "<td rowspan='1'>" + weekdays[2] + "</td>";
			scheduleHTML += "<td rowspan='1'>" + weekdays[3] + "</td>";
			scheduleHTML += "<td rowspan='1'>" + weekdays[4] + "</td>";
			scheduleHTML += "</tr>";
		}
		$("tbody").html(scheduleHTML);
	});

	$("#weekNo").html(week);

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

$("#backButton").click(function() {
	week-=1;
	loadSchedule(week, 2017);
});

$("#forwardButton").click(function() {
	week+=1;
	loadSchedule(week, 2017);
});

/*
$("#onlyHomeworkBox").on("change", function () {
	setStorage({"dashboardOnlyHomework": this.checked});
	indexHomework($(schedule), !this.checked, function () {
		updateHomeworkList();
	});
});
*/
