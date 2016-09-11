chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  if(message.optionsClick){
    chrome.runtime.openOptionsPage();
  }
});
