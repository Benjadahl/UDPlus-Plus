console.log("Uddata++ starting");

//Changes the current Uddata+ logo to the transparent version that allows the color of the navbar to be visible.
$("#navbar>div>div>a>img").attr("src",chrome.extension.getURL("UddataLogo.png"));

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "theme"){
            console.log(request.theme);
            changeColor(colorElements.navBar, request.theme.foreground);
            changeColor(colorElements.rightDropdown, request.theme.background);
            changeColor(colorElements.navbarIcon, request.theme.text);
        }
    }
);
