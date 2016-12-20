/*
THIS FILE HANDLES YOUR STORAGE FUNCTIONS DEPENDING ON YOUR USER AGENT
THIS MAKES THE PLUGIN COMPATIBLE FOR FIREFOX
*/

function getStorage(name, callback) {
	//Check if chrome sync is enabled
	if (navigator.userAgent.includes("Chrome")) {
		//Chrome sync is enabled
		//Therefore use the API
		chrome.storage.sync.get(name, callback);
	} else {
		//Chrome sync is disabled
		//Use the local storage instead
		chrome.storage.local.get(name, callback);
	}
}

function setStorage(value) {
	if (navigator.userAgent.includes("Chrome")) {
		//Chrome sync is enabled
		//Therefore use the API
		chrome.storage.sync.set(value);
	} else {
		//Chrome sync is disabled
		//Use the local storage instead
		chrome.storage.local.set(value);
	}
}
