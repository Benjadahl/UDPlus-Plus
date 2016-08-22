
var themes = {"dark" : {"foreground": "001100", "text" : "110000", "background": "000011"}, "green" : {"foreground": "220011", "text" : "dd0022", "background": "000000"}, "red": {"foreground": "000000", "text" : "000000", "background": "000000"}}

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
		chrome.storage.sync.set({'theme' : theme.value});
		chrome.storage.sync.set(themes[theme.value]);

	}, false);

	fontSelect.addEventListener('change', function() {
		chrome.storage.sync.set({'font' : fontSelect.value});
	}, false);

}, false);
