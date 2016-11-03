chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  if(message.optionsClick){
    chrome.runtime.openOptionsPage();
  }
});

chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason === "update"){
    setStorage({'showNews' : true});
  }
});
