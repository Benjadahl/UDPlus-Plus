console.log("Uddata++ starting");

document.querySelector("#navbar>div>div>a>img").src= chrome.extension.getURL("UddataLogo.png");

//Injects script.js into the html file of the Uddata website
var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
