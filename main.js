console.log("Uddata++ starting");

//Themes availeble
var themes = {
"default" : {"navBar": "#438eb9", "navbarIcon" : "#FFFFFF", "rightDropdown": "#62a8d1", "name": "default"},
"dark" : {"navBar": "rgb(43, 43, 43)", "navbarIcon" : "#FFFFFF", "rightDropdown": "rgb(43, 43, 43)", "name": "dark"},
"green" : {"navBar": "#539e24", "navbarIcon" : "#FFFFFF", "rightDropdown": "rgb(53, 115, 6)", "name": "green"},
"red": {"navBar": "#B22222", "navbarIcon": "#FFFF99", "rightDropdown": "rgba(0, 0, 0, 0.2)", "name": "red"},
"blue": {"navBar": "#0375B4", "navbarIcon": "#FFFFFF", "rightDropdown": "rgba(0, 0, 0, 0.2)", "name": "blue"}};


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


function activ_plus_menu() {
	var pagecontent = $(".page-content");
	var homework = true;
	pagecontent.html("");

	$.ajax({
  type: "GET",
	url: chrome.extension.getURL('/settings.html'),
	dataType: "html",
	success: function(data, textStatus, errorThrown){

		// Your HTTP call was successful but nothing else has happened with the response yet
		// Therefore you can now do whatever you want with the it...

		// First modify the HTML using the dataValModify function
		// Assumption being that your function returns the modified HTML string
		//

		var toAdd = data;


		var themeSelect = $(toAdd).find('#theme');
		var homeworkSelect = $(toAdd).find('#homework');

		//Firefox and chrome settings manager
		getStorage('theme', function (obj) {
			if (!chrome.runtime.error) {
				if (typeof obj.theme != "undefined"){
					toAdd = toAdd.replace('"' + obj.theme.name + '"', '"' + obj.theme.name + '" selected="selected"');
				} else {
					toAdd = toAdd.replace('"default"', '"default" selected="selected"');
				}
			}

			getStorage('homework', function (obj) {
				if (!chrome.runtime.error) {
					console.log(obj.homework);
					if(obj.homework){
						homework = true;
						console.log("Turned on");
					} else {
						toAdd = toAdd.replace('checked="checked"', '');
						homework = false;
						console.log("Turned off");
					}

					pagecontent.html(toAdd);
				}
			});



		});

		pagecontent.off("change");

		//Wait for theme selector to change
		pagecontent.on("change", "#theme", function() {
			setStorage({'theme' : themes[theme.value]});
			setStorage(themes[theme.value]);
			//attempt to send message to content script
			curtheme = themes[theme.value];
			runTheme();
		});

		pagecontent.on("change", "#homework", function() {
			homework = !homework;
			setStorage({'homework' : homework});
			console.log(homework);
		});

		//console.log(toAdd);
	}
	});

	//	$.get(chrome.extension.getURL('/settings.html'), function(data) {
	//
	//		var toAdd = data;
	//
	//		var themeSelect = $(toAdd).find('#theme');
	//		var homeworkSelect = $(toAdd).find('#homework');
	//
	//		console.log(themeSelect);
	//		console.log(homeworkSelect);
	//
	//		//Firefox and chrome settings manager
	//		getStorage('theme', function (obj) {
	//			if (!chrome.runtime.error) {
	//				if (typeof obj.theme != "undefined"){
	//					themeSelect.val("green");
	//				} else {
	//					themeSelect.val("default");
	//				}
	//			}
	//
	//			pagecontent.html($(toAdd.activeElement.innerHTML));
	//
	//
	//		});
	//
	//		getStorage('homework', function (obj) {
	//			if (!chrome.runtime.error) {
	//				if(typeof obj.homework != "undefined" && obj.homework){
	//					homeworkSelect.prop("checked", true);
	//				}
	//			}
	//		});
	//
	//		//Wait for theme selector to change
	//		pagecontent.on("change", "#theme", function() {
	//			setStorage({'theme' : themes[theme.value]});
	//			setStorage(themes[theme.value]);
	//			//attempt to send message to content script
	//			curtheme = themes[theme.value];
	//			runTheme();
	//		});
	//
	//		pagecontent.on("change", "#homework", function() {
	//			setStorage({'homework' : homeworkSelect.checked});
	//			setStorage(themes[theme.value]);
	//		});
	//
	//		console.log(toAdd);
	//	})

	$('.active').removeClass("active");
	$('#id_settings').parent().addClass("active");


}

//The ++Settings menu button
var extraMenu = '<li><a ontouchend="javascript:uddata_activ_menu(\'id_settings\');" href="#" id="id_settings"><i class="icon-wrench"></i> <span class="menu-text" title="Settings">++ Settings</span></a></li>';

//Finds the left navbar and appends extraMenu
$('html body.hoverable div#wrapper div#wrapcontent div.main-container.container-fluid div#sidebar.sidebar ul.nav.nav-list').append(extraMenu);

$('#id_settings').click(activ_plus_menu);
