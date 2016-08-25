console.log("Uddata++ starting");

//Changes the current Uddata+ logo to the transparent version that allows the color of the navbar to be visible.
$("#navbar>div>div>a>img").attr("src",chrome.extension.getURL("UddataLogo.png"));

curtheme = "";


//Changes color off element
function runTheme(){
  changeColor(colorElements.navBar, curtheme.navBar);
  changeColor(colorElements.navbarIcon, curtheme.navbarIcon);
  changeColor(colorElements.menuButtons, curtheme.navBar);
  changeColor(colorElements.rightDropdown, curtheme.rightDropdown);
  changeColor(colorElements.menuFarve, curtheme.navBar);
}


//Later changes
function runThemeLater(){

  changeColor(colorElements.pile, curtheme.navBar);
  changeColor(colorElements.skemaButtons, curtheme.navBar);
  
  changeColor(colorElements.rightDropdown, curtheme.rightDropdown);
  changeColor(colorElements.loginBtn, curtheme.navBar);
  changeColor(colorElements.overSkrift, curtheme.navBar);
  
  
  
  changeColor(colorElements.skemaTop, curtheme.navBar);
  changeColor(colorElements.arrows, curtheme.navBar);
  changeColor(colorElements.tableButtons, curtheme.navBar);
  changeColor(colorElements.tableTop, curtheme.navBar);
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "theme"){
            console.log(request.theme);
            curtheme = request.theme
            runTheme();
            runThemeLater();
        }
    }
);

chrome.storage.sync.get('theme', function (obj) {
  if (!chrome.runtime.error) {
    curtheme = obj.theme
    runTheme();
  }
});

var checkExist = setInterval(function() {
   if ($('h1').length) {
      clearInterval(checkExist);
      runThemeLater();
   }
}, 1000);
