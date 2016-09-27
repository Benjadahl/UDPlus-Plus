console.log("Uddata++ starting");

//Changes the current Uddata+ logo to the transparent version that allows the color of the navbar to be visible.
$("#navbar>div>div>a>img").attr("src",chrome.extension.getURL("resources/UddataLogo.png"));

//Save the language selected on Uddata+
if($("#language > a").html() == "English"){
	setStorage({"lang": "dansk"});
}else{
	setStorage({"lang": "engelsk"});
}


// <---- HOMEWORK MARKING
//Function for marking the homework
function markHomework(){
	$('.skemaBrikGruppe>g>g>text>title').each(function(index) {
		if ($(this).text().toUpperCase().includes("LEKTIE")) {
			$(this).parent().parent().parent().find('rect').each(function () { this.style.setProperty("fill", themes[curtheme]["lektieMark"], 'important' ); });
		}
	});
}

//Get the homework setting
getStorage('homework', function (obj) {
	if (!chrome.runtime.error) {
		//If the schedule object exists and the homework setting is true, setup interval to mark
		if (window.location.href.indexOf("skema")) {
			if(obj.homework){
				//Interval to mark homework, they will be marked when they load in
				setInterval(function() {
					markHomework();
				}, 250);
			}
		}
	}
});
// ---->

//Define the variable curtheme to contain the current theme
var curtheme = "Default";

//Try to import the theme from the settings storage
getStorage('theme', function (obj) {
	if (!chrome.runtime.error) {
		curtheme = obj.theme;
		runTheme();
	}
});

//Changes color off each element in the current theme
function runTheme(){
	for (var T in themes[curtheme]) {
		if(T != "lektieMark"){
			changeColor(colorElements[T], themes[curtheme][T]);
		}
	}
}

//When the document is ready remove the sidebar collapse button, which is broken
$(document).ready(function(){
	$("#sidebar-collapse").hide();
	getStorage('minimizeSetting', function (obj) {
		if (!chrome.runtime.error) {
			if(obj.minimizeSetting){
				$("#sidebar-collapse").show();
			}
		}
	});
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

//Get current theme from settings and execute the function that switches theme
getStorage('theme', function (obj) {
	if (!chrome.runtime.error) {
		curtheme = obj.theme;
		runTheme();
	}
});

//The ++Settings menu button
var extraMenu = '<li><a ontouchend="javascript:uddata_activ_menu(\'id_settings\');" href="#" id="id_settings"><i class="icon-wrench"></i> <span class="menu-text" title="Settings">++ Settings</span></a></li>';

//Finds the left navbar and appends extraMenu
$('html body.hoverable div#wrapper div#wrapcontent div.main-container.container-fluid div#sidebar.sidebar ul.nav.nav-list').append(extraMenu);

//Adds the function of sending a message to the background script, to the ++settings button
$('#id_settings').click(function(){
	chrome.runtime.sendMessage({optionsClick: true});
});
