var themes = {
    "dark" : {"navBar": "#1d183d", "navbarIcon" : "#8f8f8f", "rightDropdown": "#171717"},
    "green" : {"navBar": "#539e24", "navbarIcon" : "#ed8f12", "rightDropdown": "#1e4004"},
    "red": {"navBar": "#ee3915", "navbarIcon": "#254918", "rightDropdown": "#e4642e"}}

document.addEventListener('DOMContentLoaded', function() {
  var themeSelect = document.getElementById('theme');
	var fontSelect = document.getElementById('font');

	getStorage('theme', function (obj) {
		if (!chrome.runtime.error) {
      if(typeof obj.theme != "undefined"){
			  themeSelect.value = obj.theme;
      }else{
        themeSelect.value = "default"
      }
		}
	});

	getStorage('font', function (obj) {
		if (!chrome.runtime.error) {
      if(typeof obj.font != "undefined"){
			  fontSelect.value = obj.font;
      }else{
        fontSelect.value = "Open sans"
      }
		}
	});

	themeSelect.addEventListener('change', function() {
		setStorage({'theme' : themes[theme.value]});
		setStorage(themes[theme.value]);
        //attempt to send message to content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {type: "theme", theme: themes[theme.value]}, function(response) {});
        });
	}, false);

	fontSelect.addEventListener('change', function() {
		setStorage({'font' : fontSelect.value});
	}, false);

}, false);
