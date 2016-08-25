console.log("Uddata++ starting");

//Changes the current Uddata+ logo to the transparent version that allows the color of the navbar to be visible.
$("#navbar>div>div>a>img").attr("src",chrome.extension.getURL("UddataLogo.png"));


if (window.location.href.indexOf("skema")) {
	//Every two seconds, we try to find lessons containing the word homework.
	window.setInterval(function () {
		$('.skemaBrikGruppe>g.GEIF5TWDNX>g>text>title').each(function(index) {
			if ($(this).text().toUpperCase().includes("LEKTIE")) {
				$(this).parent().parent().parent().find('rect').css('fill-opacity', '0.0');
			}
		});
	}, (2 * 1000));

}



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
	
	changeColor(colorElements.a, curtheme.navBar);
	changeColor(colorElements.aHover, curtheme.rightDropdown);
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

