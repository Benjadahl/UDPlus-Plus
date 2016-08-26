console.log("Uddata++ starting");



//Changes the current Uddata+ logo to the transparent version that allows the color of the navbar to be visible.
$("#navbar>div>div>a>img").attr("src",chrome.extension.getURL("UddataLogo.png"));


if($("#language > a").html() == "English"){
	setStorage({"lang": "dansk"});
}else{
	setStorage({"lang": "engelsk"});
}

getStorage('homework', function (obj) {
	if (!chrome.runtime.error) {
		if (window.location.href.indexOf("skema") && obj.homework) {
			//Every two seconds, we try to find lessons containing the word homework.
			window.setInterval(function () {
				$('.skemaBrikGruppe>g.GEIF5TWDNX>g>text>title').each(function(index) {
					if ($(this).text().toUpperCase().includes("LEKTIE")) {
						//$(this).parent().parent().parent().find('rect').css('fill-opacity', '0.0');
                        $(this).parent().parent().parent().find('rect').css('fill', '#ff0000');
					}
				});
			}, (2 * 1000));

		}
	}
});



curtheme = "Default";

getStorage('theme', function (obj) {
  if (!chrome.runtime.error) {
    curtheme = obj.theme;
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
  changeColor(colorElements.pile, curtheme.navBar);
	changeColor(colorElements.skemaButtons, curtheme.navBar);

	changeColor(colorElements.rightDropdown, curtheme.rightDropdown);
	changeColor(colorElements.loginBtn, curtheme.navBar);
	changeColor(colorElements.overSkrift, curtheme.navBar);



	changeColor(colorElements.skemaTop, curtheme.navBar);
	changeColor(colorElements.arrows, curtheme.navBar);
	changeColor(colorElements.tableButtons, curtheme.navBar);
	changeColor(colorElements.tableTop, curtheme.navBar);

	changeColor(colorElements.a, curtheme.navBar);
	changeColor(colorElements.aHover, curtheme.rightDropdown);
}





//Wait for change in theme from popup
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "theme"){
            curtheme = request.theme;
            runTheme();
        }
    }
);

//Get current freme from settings
getStorage('theme', function (obj) {
  if (!chrome.runtime.error) {
    curtheme = obj.theme;
    runTheme();
  }
});
