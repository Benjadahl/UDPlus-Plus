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
  changeColor(colorElements.h4, curtheme.navBar);
}


//Wait for change in theme from popup
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "theme"){
            curtheme = request.theme
            runTheme();
            runThemeLater();
        }
    }
);

//Get current freme from settings
getStorage('theme', function (obj) {
  if (!chrome.runtime.error) {
    curtheme = obj.theme
    runTheme();
  }
});

//Wait for a h1 to exist, this would be then the rest of the side loads.
var checkExist = setInterval(function() {
   if ($('h1').length) {
      clearInterval(checkExist);
      runThemeLater();
   }
}, 1000);


//Check if current messages button has changes in color and change it back
var checkExist = setInterval(function() {
   if ($(".ace-nav>li.light-blue").css("background") == "#62a8d1") {
      console.log("loool");
      changeColor(colorElements.rightDropdown, curtheme.rightDropdown);
   }
}, 1000);

$('html body.hoverable div#wrapper div#wrapcontent div.main-container.container-fluid div#sidebar.sidebar ul.nav.nav-list').append('<li><a ontouchend="javascript:uddata_activ_menu(&quot;id_opgave&quot;);" href="/opgave/?id=id_opgave#oversigt:" id="id_opgave"><i class="icon-wrench"></i> <span class="menu-text" title="Settings">Settings</span></a></li>');
