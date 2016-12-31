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
	if (navigator.userAgent.includes("Chrome") && !forceLocal) {
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

	console.log(forceLocal);
	if (navigator.userAgent.includes("Chrome") && !forceLocal) {
		//Chrome sync is enabled
		//Therefore use the API
		chrome.storage.sync.set(value);
	} else {
		console.log("Set is local");
		//Chrome sync is disabled
		//Use the local storage instead
		chrome.storage.local.set(value);
	}
}

function delStorage(name) {
	if (navigator.userAgent.includes("Chrome")) {
		//Chrome sync is enabled
		//Therefore use the API
		chrome.storage.sync.remove(name);
	} else {
		//Chrome sync is disabled
		//Use the local storage instead
		chrome.storage.local.remove(name);
	}
}



function saveElement(objName, element, value){
	getStorage(objName, function (obj) {
		var tempVar = {};
		if(typeof obj[objName] !== "undefined"){
			tempVar = obj[objName];
			
		}	

		tempVar[element] = value;

		var saveVar = {};
		saveVar[objName] = tempVar;
		setStorage(saveVar);

		
		
	});
}
