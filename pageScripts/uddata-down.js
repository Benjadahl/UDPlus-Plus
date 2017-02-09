Date.prototype.getWeekNumber = function(){
	var d = new Date(+this);
	d.setHours(0,0,0,0);
	d.setDate(d.getDate()+4-(d.getDay()||7));
	return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

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
						var currentWeekNumber = new Date().getWeekNumber();
						var scheduleWeekNumber = new Date(date).getWeekNumber();
						if (scheduleWeekNumber === currentWeekNumber) {
							console.log(obj);
							$("body").append('<script src="https://use.fontawesome.com/5b06aadc00.js"></script>');
							console.log(new Date(date).getWeekNumber());
							if (lang == "dansk") {
								$("body").append("<center><h2>UDDATA+ er nede, men UD++ har cached dit skema for dig. (Hentet: " + date + ")</h2></center>");
								$("body").append("<center>Hold musen over <p style='font-family: FontAwesome; display: inline;'></p> ikonet for at vise noter på lektionerne.</center>");
							} else {
								$("body").append("<center><h2>UDDATA+ is down, but UD++ has cached your schedule for you. (Retrieved: " + date + ")</h2></center>");
								$("body").append("<center>Hover your cursor above the <p style='font-family: FontAwesome; display: inline;'></p> icon to show the notes on the lessons.</center>");
							}
							$("body").append("<center>" + schedule + "</center>");
						}

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
	$("body").append("<style>text { font-size: 14px; }</style>");
}
