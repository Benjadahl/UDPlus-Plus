//This is a temp file


//Old settings loaders, will just //delete variable

//Temp object

var tempObj = {};

getStorage("isOptionsObdated", function (obj){
	if(typeof obj.isOptionsObdated === "undefined"){
		if(!obj.isOptionsObdated){
			
			getStorage("options", function(obj){
				if(typeof obj.options !== "undefined"){
					tempObj = obj.options;
				}
			});

			getStorage('lang', function (obj) {
				if (!chrome.runtime.error) {
					if(typeof obj.lang !== "undefined"){
						console.log("Found old version of lang option. Converting...");
						tempObj.lang = obj.lang;
						delStorage("lang");
					}
				}
			});

			getStorage('customTheme', function (obj) {
				if (!chrome.runtime.error) {
					if(typeof obj.customTheme !== "undefined"){
						console.log("Found old version of customTheme option. Converting...");
						tempObj.customTheme = obj.customTheme;
						delStorage("customTheme");
					}
				}
			});


			getStorage('theme', function (obj) {
				if (!chrome.runtime.error) {
					if(typeof obj.theme !== "undefined"){
						console.log("Found old version of theme option. Converting...");
						tempObj.theme = obj.theme;
						delStorage("theme");
					}
				}
			});

			getStorage('homework', function (obj) {
				if (!chrome.runtime.error) {
					if(typeof obj.homework !== "undefined"){
						console.log("Found old version of homework option. Converting...");
						tempObj.homework = obj.homework;
						delStorage("homework");
					}
				}
			});



			getStorage('hideTask', function (obj) {
				if (!chrome.runtime.error) {
					if(typeof obj.hideTask !== "undefined"){
						console.log("Found old version of hideTask option. Converting...");
						tempObj.hideTask = obj.hideTask;
						delStorage("hideTask");
					}
				}
			});

			getStorage('sortTaskBy', function (obj) {
				if (!chrome.runtime.error) {
					if(typeof obj.sortTaskBy !== "undefined"){
						console.log("Found old version of sortTaskBy option. Converting...");
						tempObj.sortTaskBy = obj.sortTaskBy;
						delStorage("sortTaskBy");
					}
				}
			});


			getStorage('snowState', function(obj) {
				if (!chrome.runtime.error) {
					if(typeof obj.snowState !== "undefined"){
						console.log("Found old version of snowState option. Converting...");
						tempObj.snowState = obj.snowState;
						delStorage("snowState");
					}
				}
			});

			getStorage('hideSidebarCollapse', function(obj) {
				if (!chrome.runtime.error) {
					if(typeof obj.hideSidebarCollapse !== "undefined"){
						console.log("Found old version of hideSidebarCollapse option. Converting...");
						tempObj.hideSidebarCollapse = obj.hideSidebarCollapse;
						delStorage("snowState");
						//For some stupid javascript reason, these getStorage are run as a new thread. This means that i need to save the tempObj in here.
						setStorage({"options" : tempObj});
					}
				}
			});


			
			setStorage({"isOptionsObdated" : true});
		}
	}
});
