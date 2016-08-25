console.log("Uddata++ starting");

//Changes the current Uddata+ logo to the transparent version that allows the color of the navbar to be visible.
$("#navbar>div>div>a>img").attr("src",chrome.extension.getURL("UddataLogo.png"));

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "theme"){
            console.log(request.theme);
            changeColor(colorElements.navBar, request.theme.navBar);
            changeColor(colorElements.rightDropdown, request.theme.rightDropdown);
            changeColor(colorElements.navbarIcon, request.theme.navbarIcon);
        }
    }
);


chrome.storage.sync.get('theme', function (obj) {
  if (!chrome.runtime.error) {
    changeColor(colorElements.navBar, obj.theme.navBar);
    changeColor(colorElements.rightDropdown, obj.theme.rightDropdown);
    changeColor(colorElements.navbarIcon, obj.theme.navbarIcon);
  }
});
