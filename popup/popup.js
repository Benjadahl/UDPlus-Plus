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
		var hideTaskSelect = document.getElementById('hideTask');
		var sortTaskBySelect = document.getElementById('sortTaskBy');

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

		getStorage('sortTaskBy', function (obj) {
			if (!chrome.runtime.error) {
				if(typeof obj.sortTaskBy != "undefined"){
					sortTaskBySelect.value = obj.sortTaskBy;
				}else{
					sortTaskBySelect.value = "5";
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

		getStorage('hideTask', function (obj) {
			if (!chrome.runtime.error) {
				if(typeof obj.hideTask != "undefined" && obj.hideTask){
					hideTaskSelect.setAttribute("checked", "");
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

		sortTaskBySelect.addEventListener('change', function() {
			setStorage({'sortTaskBy' : sortTaskBySelect.value});

		}, false);

		homeworkSelect.addEventListener('change', function() {
			setStorage({'homework' : homeworkSelect.checked});
			setStorage(themes[theme.value]);
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {type: "homeworkChange", checked: homeworkSelect.checked}, function(response) {});
			});
		}, false);

		hideTaskSelect.addEventListener('change', function() {
			setStorage({'hideTask' : hideTaskSelect.checked});

		}, false);



	}, false);
