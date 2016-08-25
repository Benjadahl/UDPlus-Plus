
//Themes availeble
var themes = {
	"default" : {"navBar": "#438eb9", "navbarIcon" : "#FFFFFF", "rightDropdown": "#62a8d1", "name": "default"},
	"dark" : {"navBar": "rgb(43, 43, 43)", "navbarIcon" : "#FFFFFF", "rightDropdown": "rgb(43, 43, 43)", "name": "dark"},
	"green" : {"navBar": "#539e24", "navbarIcon" : "#FFFFFF", "rightDropdown": "rgb(53, 115, 6)", "name": "green"},
	"red": {"navBar": "#B22222", "navbarIcon": "#FFFF99", "rightDropdown": "rgba(0, 0, 0, 0.2)", "name": "red"},
	"blue": {"navBar": "#0375B4", "navbarIcon": "#FFFFFF", "rightDropdown": "rgba(0, 0, 0, 0.2)", "name": "blue"}};


//wait for document to load
	document.addEventListener('DOMContentLoaded', function() {
		
		getStorage('lang', function (obj) {
			if (!chrome.runtime.error) {
				var path = window.location.pathname;
				var page = path.split("/").pop();
				console.log(obj.lang)
				if(page == "popup.html" && obj.lang == "dansk"){
					window.location.href = "popupdk.html";
				}
			}
		});
		
		var themeSelect = document.getElementById('theme');
		var fontSelect = document.getElementById('font');
		var homeworkSelect = document.getElementById('homework');
		
		//Firefox and chrome settings manager
		getStorage('theme', function (obj) {
			if (!chrome.runtime.error) {
				if(typeof obj.theme != "undefined"){
					themeSelect.value = obj.theme.name;
				}else{
					themeSelect.value = "default"
				}
			}
		});
		
		getStorage('homework', function (obj) {
			if (!chrome.runtime.error) {
				if(typeof obj.homework != "undefined" && obj.homework){
					homeworkSelect.setAttribute("checked", "");
				}
			}
		});
		
		
		//Wait for theme selector to change
		themeSelect.addEventListener('change', function() {
			setStorage({'theme' : themes[theme.value]});
			setStorage(themes[theme.value]);
			//attempt to send message to content script
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {type: "theme", theme: themes[theme.value]}, function(response) {});
			});
		}, false);
		
		homeworkSelect.addEventListener('change', function() {
			setStorage({'homework' : homeworkSelect.checked});
			setStorage(themes[theme.value]);
			
		}, false);

		

	}, false);
