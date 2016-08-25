
document.addEventListener('DOMContentLoaded', function() {
  var saveButton = document.getElementById('savebtn');
  var foregroundSelect = document.getElementById('foreground');
  var textSelect = document.getElementById('text');
  var backgroundSelect = document.getElementById('background');

  getStorage('foreground', function (obj) {
		if (!chrome.runtime.error) {
			foregroundSelect.value = obj.foreground;
      textSelect.value = obj.text;
		}
	});

  getStorage('text', function (obj) {
		if (!chrome.runtime.error) {
			textSelect.value = obj.text;
      textSelect.value = obj.text;
		}
	});

  getStorage('background', function (obj) {
		if (!chrome.runtime.error) {
			backgroundSelect.value = obj.background;
      backgroundSelect.value = obj.background;
		}
	});



  saveButton.addEventListener('click', function() {
		//Gem til indstillinger
		setStorage({"foreground": foregroundSelect.value, "text" : textSelect.value, "background": backgroundSelect.value});
    window.location.replace("popup.html");
  }, false);


}, false);
