
var themes = {"dark" : {"navBar": "#1d183d", "navbarIcon" : "#8f8f8f", "rightDropdown": "#171717"}, "green" : {"navBar": "#539e24", "navbarIcon" : "#ed8f12", "rightDropdown": "#1e4004"}, "red": {"navBar": "#ee3915", "navbarIcon": "#254918", "rightDropdown": "#e4642e"}}

document.addEventListener('DOMContentLoaded', function() {
  var themeSelect = document.getElementById('theme');
	var fontSelect = document.getElementById('font');

	chrome.storage.sync.get('theme', function (obj) {
		if (!chrome.runtime.error) {
			themeSelect.value = obj.theme;
		}
	});

	chrome.storage.sync.get('font', function (obj) {
		if (!chrome.runtime.error) {
			fontSelect.value = obj.font;
		}
	});

	themeSelect.addEventListener('change', function() {
		chrome.storage.sync.set({'theme' : themes[theme.value]});
		chrome.storage.sync.set(themes[theme.value]);
        //attempt to send message to content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {type: "theme", theme: themes[theme.value]}, function(response) {});
        });
	}, false);

	fontSelect.addEventListener('change', function() {
		chrome.storage.sync.set({'font' : fontSelect.value});
	}, false);

}, false);
