/*
	 THIS FILE HANDLES YOUR STORAGE FUNCTIONS DEPENDING ON YOUR USER AGENT
	 THIS MAKES THE PLUGIN COMPATIBLE FOR FIREFOX
	 */

function getStorage(name, forceLocal, callback) {

	if (arguments.length == 2) {
		if (Object.prototype.toString.call(forceLocal) == "[object Function]") {
			callback = forceLocal;
			forceLocal = false;
		}
	}
	//Check if chrome sync is enabled
	if (navigator.userAgent.includes("Chrome") || !forceLocal) {
		//Chrome sync is enabled
		//Therefore use the API
		chrome.storage.sync.get(name, callback);
	} else {
		//Chrome sync is disabled
		//Use the local storage instead
		chrome.storage.local.get(name, callback);
	}
}

function setStorage(value, forceLocal) {
	if (arguments.length == 1) forceLocal = false;

	if (navigator.userAgent.includes("Chrome") || !forceLocal) {
		//Chrome sync is enabled
		//Therefore use the API
		chrome.storage.sync.set(value);
	} else {
		//Chrome sync is disabled
		//Use the local storage instead
		chrome.storage.local.set(value);
	}
}
