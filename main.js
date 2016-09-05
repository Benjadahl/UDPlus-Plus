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

$('html body.hoverable div#wrapper div#wrapcontent div.main-container.container-fluid div#sidebar.sidebar ul.nav.nav-list').append('<li><a ontouchend="javascript:uddata_activ_menu(&quot;id_opgave&quot;);" href="/opgave/?id=id_opgave#oversigt:" id="id_opgave"><i class="icon-wrench"></i> <span class="menu-text" title="Settings">++ Settings</span></a></li>');
