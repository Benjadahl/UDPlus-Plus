
var themes = {"default" : {"foreground": "438eb9", "text" : "438eb9", "background": "FFFFFF"}, "dark" : {"foreground": "323232", "text" : "FFFFFF", "background": "282828"}, "green" : {"foreground": "779933", "text" : "FFFFFF", "background": "5C7827"}, "red": {"foreground": "FF3333", "text" : "FFFFFF", "background": "CC3333"}, "blue" : {"foreground": "0092CC", "text" : "FFFFFF", "background": "087099"}}

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
