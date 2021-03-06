console.log("UD++ starting");

//News string in this version. Leave empty for off.
newsString = "UD++ Dashboard available! Press the UD++ button in the top right corner of your browser.";



//Define the variable curtheme to contain the current theme
var curtheme = "Default";

//Define the current page variable, which is used with runTheme
var curPage = "start";
//We need to use this function to load all the settings
function loadSettings() {
	//Load custom theme
	getStorage('customTheme', function (obj) {
		if (!chrome.runtime.error) {
			customTheme = obj.customTheme;
		}
	});

	getStorage('snowState', function(obj) {
		if (!chrome.runtime.error) {
			if (obj.snowState) {
				$(document).ready( function(){
					if (new Date().getMonth() === 11){
						$(".xmasHat").remove();
						if(obj.snowState[0]){$.fn.snow();}
						if(obj.snowState[1]){
							//URL for xmas-hat https://pixabay.com/p-1087651/?no_redirect

							//The dropdown-toggle is the div that includes the dropdown menu and profile picture
							$(".dropdown-toggle").eq(0).append("<img width=39px class='xmasHat' src=" + chrome.extension.getURL("resources/xmasHat.png") + ">");
							//The position needs to be absolute, so that other elements do not get moved around by it
							$(".xmasHat").css("position", "absolute");
							//Adjust positioning of hat
							$(".xmasHat").css("top", "-11px");

							//The hat will have a different position for each language
							getStorage('lang', function(obj) {
								//Variable for storing the right attribute for the hat
								var xHatRight = "100px";

								if (!chrome.runtime.error) {
									//If the language is danish add slightly more to the margin
									if (obj.lang === "dansk") xHatRight = "104px";
								}

								//Apply the margin
								$(".xmasHat").css("right", xHatRight);
							});
						}
					}
				});
			}
		}
	});

	$("#sidebar-collapse").show();
	getStorage('hideSidebarCollapse', function (obj) {
		if (!chrome.runtime.error) {
			if(obj.hideSidebarCollapse){
				$("#sidebar-collapse").hide();
			}
		}
	});

	getStorage('theme', function (obj) {
		if (!chrome.runtime.error) {
			if (typeof obj.theme !== 'undefined') {
				curtheme = obj.theme;
			} else {
				curtheme = 'default';
			}
			debugLog("loaded curtheme");
			runTheme(curtheme, curPage);
		}
	});

	getStorage('devMode', function (obj) {
		if (!chrome.runtime.error) {
			if(obj.devMode){
				$("#navbar>div>div>a>img").attr("src",chrome.extension.getURL("resources/Inddata.png"));
			} else {
				//Changes the current Uddata+ logo to the transparent version that allows the color of the navbar to be visible.
				$("#navbar>div>div>a>img").attr("src",chrome.extension.getURL("resources/UddataLogo.png"));
			}
		}
	});


}

// Removes the no-select class, allowing us to select stuff once again.
function allowSelect() {
	if (window.location.href.indexOf("skema") === -1 ) $(".no-select").removeClass("no-select");
}
setInterval(allowSelect, 250);

//Define the variable curtheme to contain the current theme
//var curtheme = "";



loadSettings();

chrome.storage.onChanged.addListener(function(changes, namespace) {
	//Try to import the theme from the settings storage
	loadSettings();
});


//Wait for change in theme from popup
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.type == "theme"){
			curtheme = request.theme;
			location.reload();
		}
	}
);


//The ++Settings menu button
var extraMenu = '<li><a ontouchend="javascript:uddata_activ_menu(\'id_settings\');" href="#" id="id_settings"><i class="icon-wrench"></i> <span class="menu-text" title="Settings">++ Settings</span></a></li>';
//The homework button
var extraMenuHomeworkDK = '<li title="Genvej til uddata lektie oversigten"><a href="/skema/?id=id_skema#lektieoversigt:" id="id_homework"><i class="icon-briefcase" aria-hidden="true"></i> <span class="menu-text" title="Lektie genvej">Lektier</span></a></li>';
var extraMenuHomeworkEN = '<li title="Shortcut to uddata homework overview"><a href="/skema/?id=id_skema#lektieoversigt:" id="id_homework"><i class="icon-briefcase" aria-hidden="true"></i> <span class="menu-text" title="Homework shortcut">Homework</span></a></li>';

const menuSelector = 'html body.hoverable div#wrapper div#wrapcontent div.main-container.container-fluid div#sidebar.sidebar ul.nav.nav-list';

//Finds the left navbar and appends extraMenu
$(menuSelector).append(extraMenu);

//Adds the function of sending a message to the background script, to the ++settings button
$('#id_settings').click(function(){
	chrome.runtime.sendMessage({action: "options"});
});

getStorage('showNews', function (obj) {
	if (!chrome.runtime.error) {
		if(obj.showNews && newsString != ""){
			$('#sidebar').append("<p style='margin-left: 10px; margin-right: 10px; margin-top: 5px;'><b>UD++:</b> " + newsString + "</p>");
		}
	}
});

//Save the language selected on Uddata+
if($("#language > a").html() === "English"){
	setStorage({"lang": "dansk"});

	//While we are here lets just add the homework button
	if($("#id_homework").length == 0){
		$(extraMenuHomeworkDK).insertAfter($("#id_skema").parent());
	}
}else if($("#language > a").html() === "Dansk"){
	setStorage({"lang": "engelsk"});

	//And down here to
	if($("#id_homework").length == 0){
		$(extraMenuHomeworkEN).insertAfter($("#id_skema").parent());
	}
}


getStorage('message', function (obj) {
	if (!chrome.runtime.error) {
		if(typeof obj.message != "undefined"){
			$(".brand").append('<small class="smaller-50">' + obj.message + '</small>');
		}
	}
});

$("#id_ressourcer > span:contains('Ressources')").html("Resources");
