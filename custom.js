
document.addEventListener('DOMContentLoaded', function() {
  var saveButton = document.getElementById('savebtn');
  saveButton.addEventListener('click', function() {
		chrome.storage.sync.set({"topbar": document.getElementById("topbar").value, "background": document.getElementById("background").value, "font": document.getElementById("font").value});
    window.location.replace("popup.html");
  }, false);
}, false);
