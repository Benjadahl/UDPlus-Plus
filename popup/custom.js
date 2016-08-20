
document.addEventListener('DOMContentLoaded', function() {
  var saveButton = document.getElementById('savebtn');
  var foregroundSelect = document.getElementById('foreground');
  var textSelect = document.getElementById('text');
  var backgroundSelect = document.getElementById('background');
  
  chrome.storage.sync.get('foreground', function (obj) {
		if (!chrome.runtime.error) {
			foregroundSelect.value = obj.foreground;
      textSelect.value = obj.text;
		}
	});
  
  chrome.storage.sync.get('text', function (obj) {
		if (!chrome.runtime.error) {
			textSelect.value = obj.text;
      textSelect.value = obj.text;
		}
	});
  
  chrome.storage.sync.get('background', function (obj) {
		if (!chrome.runtime.error) {
			backgroundSelect.value = obj.background;
      backgroundSelect.value = obj.background;
		}
	});
  
  
  
  saveButton.addEventListener('click', function() {
		//Gem til indstillinger
		chrome.storage.sync.set({"foreground": foregroundSelect.value, "text" : textSelect.value, "background": backgroundSelect.value});
    window.location.replace("popup.html");
  }, false);
  
  
}, false);
