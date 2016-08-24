

var themes = {"dark" : {"foreground": "#1d183d", "text" : "#8f8f8f", "background": "#171717"}, "green" : {"foreground": "#539e24", "text" : "#ed8f12", "background": "#1e4004"}, "red": {"foreground": "#ee3915", "text": "#254918", "background": "#e4642e"}}


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
        //attempt to send message to content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {type: "theme", theme: themes[theme.value]}, function(response) {});
        });
	}, false);

	fontSelect.addEventListener('change', function() {
		chrome.storage.sync.set({'font' : fontSelect.value});
	}, false);

}, false);
