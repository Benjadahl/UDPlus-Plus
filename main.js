console.log("Uddata++ starting");

//Changes the current Uddata+ logo to the transparent version that allows the color of the navbar to be visible.
$("#navbar>div>div>a>img").attr("src",chrome.extension.getURL("UddataLogo.png"));


if($("#language > a").html() == "English"){
	setStorage({"lang": "dansk"});
}else{
	setStorage({"lang": "engelsk"});
}


// <---- HOMEWORK MARKING
var mark;

getStorage('homework', function (obj) {
	if (!chrome.runtime.error) {
		if (window.location.href.indexOf("skema")) {
			mark = obj.homework;
		}
	}
});

$("head").append("<style>svg .GEIF5TWDNX rect{fill-opacity:0.75 !important;}</style>");

function markHomework(){
	if(mark){
		$('.skemaBrikGruppe>.GI4H3JYPX>g>text>title').each(function(index) {
			if ($(this).text().toUpperCase().includes("LEKTIE")) {
				$(this).parent().parent().parent().find('rect').each(function () { this.style.setProperty("fill", "#ff0000", 'important' ); });
			}
		});
	}else{
		$('.skemaBrikGruppe>g.GI4H3JYPX>g>text>title').each(function(index) {
			if ($(this).text().toUpperCase().includes("LEKTIE")) {
				$(this).parent().parent().parent().find('rect').removeAttr("style");
			}
		});
	}
}

setInterval(function() {
	markHomework();
}, 500);

curtheme = "Default";

getStorage('theme', function (obj) {
	if (!chrome.runtime.error) {
		curtheme = obj.theme;

		runTheme();
	}
});


//Changes color off element
function runTheme(){
	for (var T in themes[curtheme]) {
		changeColor(colorElements[T], themes[curtheme][T]);
	}
}

$(document).ready(function(){
	$("#sidebar-collapse").hide();

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

//Get current freme from settings
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

$('#id_settings').click(function(){
	chrome.runtime.sendMessage({optionsClick: true}, function(response) {
  	console.log("Send optionsclick");
	});
});
