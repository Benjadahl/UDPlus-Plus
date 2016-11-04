chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  if(message.optionsClick){
    chrome.runtime.openOptionsPage();
  }
});

chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason === "update"){
    //This code will run every time the plugin is updated
    //It will make the news paragraph appear under the ++ Settings button
    setStorage({'showNews' : true});
  }
});
