//Listener for the button press from the ++settings button
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  if(message.optionsClick){
    chrome.runtime.openOptionsPage();
  }
});
