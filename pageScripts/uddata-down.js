window.onload = function() {
	getStorage("cachedSchedule", true, function(obj) {
		if (!chrome.runtime.error) {
			if (typeof obj.cachedSchedule !== "undefined") {
				//Font awesome, because the schedule depends on that.
				var schedule = obj.cachedSchedule;
				getStorage('lang', function(obj) {
					$("body").append('<script src="https://use.fontawesome.com/5b06aadc00.js"></script>');
					if (obj.lang == "dansk") {
						$("body").append("<center><h2>UDDATA+ er nede, men UD++ har cached dit skema for dig.</h2></center>");
						$("body").append("<center>Hover over <p style='font-family: FontAwesome; display: inline;'></p> ikonet for at vise noten.</center>");
					} else {
						$("body").append("<center><h2>UDDATA+ is down, but UD++ has cached your schedule for you.</h2></center>");
						$("body").append("<center>Hover over the <p style='font-family: FontAwesome; display: inline;'></p> icon to show the note.</center>");
					}
					$("body").append("<center>" + schedule + "</center>");
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
