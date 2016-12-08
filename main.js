console.log("Uddata++ starting");

//Changes the current Uddata+ logo to the transparent version that allows the color of the navbar to be visible.
$("#navbar>div>div>a>img").attr("src",chrome.extension.getURL("resources/UddataLogo.png"));

//Define the variable curtheme to contain the current theme
var curtheme = "Default";

//Define the current page variable, which is used with runTheme
var curPage = "start";

var homeworkList = ["lektie"];

var homeworkColour = "#ED2939";

// <---- HOMEWORK MARKING
//Function for marking the homework
function markHomework(){
	$(".homeworkLesson").removeClass("homeworkLesson");
	$('.skemaBrikGruppe>g>g>text>title').each(function(index) {
		var toMark = false;
		var arrayLength = homeworkList.length;
		for (var i=0; i < arrayLength; i++) {
			if ($(this).text().toUpperCase().includes(homeworkList[i].toUpperCase())) toMark = true;
		}
		if (toMark) {
			//$(this).parent().parent().parent().find('rect').each(function () { this.style.setProperty("fill", homeworkColour, 'important' ); });
			$(this).parent().parent().parent().find('rect').each(function () { $(this).addClass("homeworkLesson"); });
		}
	});
}

var sheet = document.createElement('style')
sheet.innerHTML = ".homeworkLesson {fill: " + homeworkColour + " !important}";
document.body.appendChild(sheet);

function stringToList(string) {
	var thelist = string.split(",");
	for (var i=0; i<thelist.length; i++) {
		thelist[i] = thelist[i].replace(/\s/g, "");
		if (thelist[i] == "") thelist.splice(i,1);
	}
	if (thelist === [""]) thelist.splice(0,1);
	return thelist;

}

//We need to use this function to load all the settings
function loadSettings() {

	//Keywords for checking homework
	getStorage({homeworkWords: "lektie,forbered"}, function(obj) {
		if (!chrome.runtime.error) {
			homeworkList = stringToList(obj.homeworkWords);
		}
	});

	//Get the homework setting
	var homeworkCheckerInterval;
	getStorage('homework', function (obj) {
		if (!chrome.runtime.error) {
			//If the schedule object exists and the homework setting is true, setup interval to mark
			if (window.location.href.indexOf("skema")) {
				if(obj.homework){
					//Interval to mark homework, they will be marked when they load in
					clearInterval(homeworkCheckerInterval);
					homeworkCheckerInterval = setInterval(function() {
						markHomework();
					}, 250);
				}
			}
		}
	});

	getStorage({toHide: ""}, function(obj) {
		if (!chrome.runtime.error) {
			toHideList = stringToList(obj.toHide);
			$(".hiddenLesson").removeClass("hiddenLesson");
			setInterval(function() {
				for (var i=0; i < toHideList.length; i++) {
					$(".DagMedBrikker").find("g").find("text:contains('" + toHideList[i] + "')").parent().parent().addClass("hiddenLesson");
				}
			}, 250);
		}
	});

	getStorage('snowState', function(obj) {
		if (!chrome.runtime.error) {
			if (obj.snowState) {
				$(document).ready( function(){
					if (new Date().getMonth() === 11){
						if(obj.snowState[0]){$.fn.snow();}
						if(obj.snowState[1]){
							//Link til nissehue https://pixabay.com/p-1087651/?no_redirect
							$(".light-blue").eq(1).append("<img width=39px class='nissehue' src=" + chrome.extension.getURL("resources/xmasHat.png") + ">");
							$(".nissehue").css("position", "relative");
							$(".nissehue").css("top", "-75px");
							//$(".nissehue").css("right", "0px");
						}
					}
				});
			}

		}
	});

	getStorage('theme', function (obj) {
		if (!chrome.runtime.error) {
			curtheme = obj.theme;
			console.log("loaded curtheme");
			runTheme(curtheme, curPage);
		}
	});

}

// Removes the no-select class, allowing us to select stuff once again.
function allowSelect() {
	if (window.location.href.indexOf("skema") === -1 ) $(".no-select").removeClass("no-select");
}
//Define the variable curtheme to contain the current theme
//var curtheme = "";

setInterval(allowSelect, 250);

//Save the language selected on Uddata+
if($("#language > a").html() == "English"){
	setStorage({"lang": "dansk"});
}else{
	setStorage({"lang": "engelsk"});
}


//On the download on class notes, we set the title attribute to the download attribute. Then, if the full title ends up in the overflow, you can mouse over it to see it anyway.
function setTitleToDownload() {
	$( "a[download]" ).each(function( index ) {
		$(this).attr("title", $(this).attr("download"));
	});
}
setInterval(setTitleToDownload, 250);

loadSettings();

chrome.storage.onChanged.addListener(function(changes, namespace) {
	//Try to import the theme from the settings storage
	loadSettings();
});



getStorage('customTheme', function (obj) {
	if (!chrome.runtime.error) {
		customTheme = obj.customTheme;
	}
});


//When the document is ready remove the sidebar collapse button, which is broken
$(document).ready(function(){
	$("#sidebar-collapse").show();
	getStorage('hideSidebarCollapse', function (obj) {
		if (!chrome.runtime.error) {
			if(obj.hideSidebarCollapse){
				$("#sidebar-collapse").hide();
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



//The ++Settings menu button
var extraMenu = '<li><a ontouchend="javascript:uddata_activ_menu(\'id_settings\');" href="#" id="id_settings"><i class="icon-wrench"></i> <span class="menu-text" title="Settings">++ Settings</span></a></li>';

const menuSelector = 'html body.hoverable div#wrapper div#wrapcontent div.main-container.container-fluid div#sidebar.sidebar ul.nav.nav-list';

//Finds the left navbar and appends extraMenu
$(menuSelector).append(extraMenu);

//Adds the function of sending a message to the background script, to the ++settings button
$('#id_settings').click(function(){
	chrome.runtime.sendMessage({optionsClick: true});
});

getStorage('showNews', function (obj) {
	if (!chrome.runtime.error) {
		if(obj.showNews){
			$('#sidebar').append("<p style='margin-left: 10px; margin-right: 10px; margin-top: 5px;'><i>UD++: Christmas decorations available in the settings menu (December)</i></p>");
		}
	}
});


function setTrans(){
	var array = ["sidebarColor", "navbarIcon", "mainBackground", "mainContainer", "copyrightTop", "leftMenuLIborderBottom", "leftMenuBorder","tableBackground", "leftMenuBottom", "assignmentSetting", "tableBottom"]
	for (var i = 0; i < array.length; i++) {
		changeColor(colorElements[array[i]], "rgba(0,0,0,0)")
	}
	changeColor(colorElements["mainContainerH"], (window.innerHeight-45) + "px");
	changeColor(colorElements["mainBackImgFill"], "cover");
}


$(document.body).append("<style>.hideLesson { visibility: hidden; }</style>");
