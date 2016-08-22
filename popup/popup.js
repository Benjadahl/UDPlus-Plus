
var themes = {"dark" : {"foreground": "001100", "text" : "110000", "background": "000011"}, "green" : {"foreground": "220011", "text" : "dd0022", "background": "000000"}, "red": {"foreground": "000000", "text" : "000000", "background": "000000"}}

document.addEventListener('DOMContentLoaded', function() {
  var themeSelect = document.getElementById('theme');
	var fontSelect = document.getElementById('font');

	chrome.storage.sync.get('theme', function (obj) {
		if (!chrome.runtime.error) {
      if(typeof obj.theme != "undefined"){
			  themeSelect.value = obj.theme;
      }else{
        themeSelect.value = "default"
      }
		}
	});

	chrome.storage.sync.get('font', function (obj) {
		if (!chrome.runtime.error) {
      if(typeof obj.font != "undefined"){
			  fontSelect.value = obj.font;
      }else{
        fontSelect.value = "Open sans"
      }
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
