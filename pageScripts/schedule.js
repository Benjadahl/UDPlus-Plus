/*      schedule.js

  THIS IS THE PAGESCRIPT FOR THE SCHEDULE PAGE
*/

//Set the current page variable
curPage = "schedule";
var homeworkList = ["lektie"];

console.log("test" + curtheme);

//On the download links in class notes, set the title attribute to the file name, so we can see the full filename on hover.
function setTitleToDownload() {
	$("a[download]").each(function() {
		$(this).attr("title", $(this).attr("download"));
	});
}
setInterval(setTitleToDownload, 250);

//Function to be called every time settings are changed
function loadScheduleSettings() {

	//Keywords for checking homework
	getStorage({homeworkWords: "lektie,forbered"}, function(obj) {
		if (!chrome.runtime.error) {
			homeworkList = stringToList(obj.homeworkWords);
		}
	});

	//Get the homework setting
	var homeworkCheckerInterval;
	getStorage('options', function (object) {
		if (!chrome.runtime.error) {
			var obj = object.options;
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


}

loadScheduleSettings();
chrome.storage.onChanged.addListener(function(changes, namespace) {
	//Try to import the theme from the settings storage
	loadScheduleSettings();
});

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
			$(this).parent().parent().parent().find('rect').each(function () { $(this).addClass("homeworkLesson"); });
		}
	});
}


$(document.body).append("<style>.hideLesson { visibility: hidden; }</style>");
