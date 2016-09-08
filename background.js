//setTimeout(function() {
//  chrome.runtime.openOptionsPage();
//}, 2500);

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  if(message.optionsClick){
    chrome.runtime.openOptionsPage();
  }
});
