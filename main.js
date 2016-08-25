console.log("Uddata++ starting");

//Changes the current Uddata+ logo to the transparent version that allows the color of the navbar to be visible.
$("#navbar>div>div>a>img").attr("src",chrome.extension.getURL("UddataLogo.png"));

curtheme = "Default";

getStorage('theme', function (obj) {
  if (!chrome.runtime.error) {
    curtheme = obj.theme
    runTheme();
  }
});

function runTheme(){
  changeColor(colorElements.navBar, curtheme.navBar);
  changeColor(colorElements.navbarIcon, curtheme.navbarIcon);
  changeColor(colorElements.menuButtons, curtheme.navBar);
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "theme"){
            curtheme = request.theme
            runTheme();
            changeColor(colorElements.pile, curtheme.navBar);
            changeColor(colorElements.skemaButtons, curtheme.navBar);
            changeColor(colorElements.skemaTop, curtheme.navBar);
        }
    }
);


var checkExist = setInterval(function() {
   if ($('h1').length) {
      clearInterval(checkExist);
      changeColor(colorElements.pile, curtheme.navBar);
      changeColor(colorElements.skemaButtons, curtheme.navBar);
      changeColor(colorElements.skemaTop, curtheme.navBar);
      changeColor(colorElements.rightDropdown, curtheme.rightDropdown);
      //changeColor(colorElements.overskrift, curtheme.navbarIcon);
   }
}, 1000);
