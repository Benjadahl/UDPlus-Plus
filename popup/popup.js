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
					themeSelect.value = "default";
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
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {type: "homeworkChange", checked: homeworkSelect.checked}, function(response) {});
			});
		}, false);



	}, false);
