window.onload = function() {
	getStorage("cachedSchedule", true, function(obj) {
		if (!chrome.runtime.error) {
			//Font awesome, because the schedule depends on that.
			$("body").append('<script src="https://use.fontawesome.com/5b06aadc00.js"></script>');
			$("body").append("<center><i>UDDATA+ er måske nede, men her er det godt du har installeret UD++! Vi har gemt dit skema, så du er semi-reddet.</i></center>");
			$("body").append("<center>" + obj.cachedSchedule + "</center>");
		}
	});
}
