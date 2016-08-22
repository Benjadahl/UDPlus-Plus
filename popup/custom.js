
document.addEventListener('DOMContentLoaded', function() {
  var saveButton = document.getElementById('savebtn');
  var foregroundSelect = document.getElementById('foreground');
  var textSelect = document.getElementById('text');
  var backgroundSelect = document.getElementById('background');

  chrome.storage.sync.get('foreground', function (obj) {
		if (!chrome.runtime.error) {
      if(typeof obj.foreground != "undefined"){
			  foregroundSelect.value = obj.foreground;
      }else{
        foregroundSelect.value = "438eb9";
      }
      $("#foreground").css("background-color","#" + foregroundSelect.value);

		}
	});

  chrome.storage.sync.get('text', function (obj) {
		if (!chrome.runtime.error) {
      if(typeof obj.text != "undefined"){
			  textSelect.value = obj.text;
      }else{
        textSelect.value = "438eb9"
      }
      $("#text").css("background-color","#" + textSelect.value);
		}
	});

  chrome.storage.sync.get('background', function (obj) {
		if (!chrome.runtime.error) {
      if(typeof obj.background != "undefined"){
			  backgroundSelect.value = obj.background;
      }else{
        backgroundSelect.value = "FFFFFF"
      }
      $("#background").css("background-color","#" + backgroundSelect.value);
		}
	});


  saveButton.addEventListener('click', function() {
		//Gem til indstillinger
		chrome.storage.sync.set({"foreground": foregroundSelect.value, "text" : textSelect.value, "background": backgroundSelect.value});
    window.location.replace("popup.html");
  }, false);


}, false);
