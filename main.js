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

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "homeworkChange"){
            mark = request.checked;
			markHomework();
        }
    }
);

$("head").append("<style>svg .GEIF5TWDNX rect{fill-opacity:0.75 !important;}</style>");

function markHomework(){
	if(mark){
		$('.skemaBrikGruppe>g.GEIF5TWDNX>g>text>title').each(function(index) {
			if ($(this).text().toUpperCase().includes("LEKTIE")) {
				//$(this).parent().parent().parent().find('rect').css('fill-opacity', '0.0');
				//$(this).parent().parent().parent().find('rect').css('fill', '#ff0000');
				$(this).parent().parent().parent().find('rect').each(function () { this.style.setProperty("fill", "#ff0000", 'important' ); });
			}
		});
	}else{
		$('.skemaBrikGruppe>g.GEIF5TWDNX>g>text>title').each(function(index) {
			if ($(this).text().toUpperCase().includes("LEKTIE")) {
				//$(this).parent().parent().parent().find('rect').css('fill', 'rgb(255,239,197)');
				$(this).parent().parent().parent().find('rect').removeAttr("style");
			}
		});
	}
}

setInterval(function() {
	markHomework();
}, 500);

//Every two seconds, we try to find lessons containing the word homework.
/*window.setInterval(function () {
	markHomework();
}, (2 * 1000));*/

// ---->

curtheme = "Default";

getStorage('theme', function (obj) {
  if (!chrome.runtime.error) {
    curtheme = obj.theme;
    runTheme();
  }
});


//Changes color off element
function runTheme(){
	for (var T in curtheme) {
		changeColor(colorElements[T], curtheme[T]);
	}

	/*changeColor(colorElements.navBar, curtheme.navBar);
	changeColor(colorElements.navbarIcon, curtheme.navbarIcon);
	changeColor(colorElements.menuButtons, "blue");
	changeColor(colorElements.rightDropdown, curtheme.rightDropdown);
	changeColor(colorElements.rightDropdownRightEdge, curtheme.navBar);
	changeColor(colorElements.skemaButtons, curtheme.navBar);

	changeColor(colorElements.rightDropdown, curtheme.rightDropdown);
	changeColor(colorElements.loginBtn, curtheme.navBar);
	changeColor(colorElements.overSkrift, curtheme.navBar);



	changeColor(colorElements.skemaTop, curtheme.navBar);
	changeColor(colorElements.arrows, curtheme.navBar);
	changeColor(colorElements.tableButtons, curtheme.navBar);
	changeColor(colorElements.tableTopActive, curtheme.navBar);

	changeColor(colorElements.a, curtheme.navBar);
	changeColor(colorElements.aHover, curtheme.rightDropdown);

	changeColor(colorElements.leftMenuBorder, "blue");
	changeColor(colorElements.copyrightTop, "blue")

	changeColor(colorElements.leftMenuLI, "red");
	changeColor(colorElements.leftMenuBottom, "red");
	changeColor(colorElements.leftMenuRight, "blue");
	changeColor(colorElements.mainBackground, "red");
	changeColor(colorElements.sidebarCollapse, "red");
	changeColor(colorElements.sidebarCollapseIcon, "red");
	changeColor(colorElements.tableBottom, "red");
	changeColor(colorElements.tableTop, "red");
	changeColor(colorElements.tableLeftSide, "red");
	changeColor(colorElements.tableCorner, "red");
	changeColor(colorElements.lessonFill, "blue");
	changeColor(colorElements.outerBackground, "red");
	changeColor(colorElements.lessonStroke, "red");
	changeColor(colorElements.leftMenuLIborderRight, "blue");
	changeColor(colorElements.leftMenuLIborderTop, "blue");
	changeColor(colorElements.leftMenuLIborderBottom, "blue");

	changeColor(colorElements.tableButtonsText,"red");
	changeColor(colorElements.studentInfo,"white");
	changeColor(colorElements.navBarText,"blue");
	changeColor(colorElements.messageCounter,"blue");
	changeColor(colorElements.copyRightNotice, "blue");
	changeColor(colorElements.mainText, "blue");
	changeColor(colorElements.linkLanguage, "blue");
	changeColor(colorElements.tableTopText, "black");
	changeColor(colorElements.tableTopTextActive, "blue");
	changeColor(colorElements.leftMenuActiveLi, "green");
	changeColor(colorElements.tableRowNote, "green");
	changeColor(colorElements.schoolEdges, "red");
	changeColor(colorElements.profileRing, "red");*/
}

$(document).ready(function(){
	$("#sidebar-collapse").hide();

});

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

$('html body.hoverable div#wrapper div#wrapcontent div.main-container.container-fluid div#sidebar.sidebar ul.nav.nav-list').append('<li><a ontouchend="javascript:uddata_activ_menu(&quot;id_opgave&quot;);" href="/opgave/?id=id_opgave#oversigt:" id="id_opgave"><i class="icon-wrench"></i> <span class="menu-text" title="Settings">++ Settings</span></a></li>');
