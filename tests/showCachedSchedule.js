window.onload = function() {
	getStorage('cachedSchedule', true, function(obj) {
		if (!chrome.runtime.error) {
			document.getElementById("schedule").innerHTML = cachedSchedule;
		}
	});
}
