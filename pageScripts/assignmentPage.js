//Set the current page variable
curPage = "assignments";

var table = ".page-content > div > div > table > tbody"
var hideTask = "";
var sortBy = 3;
var timeFilterTextHide = false;
var filterTime = "10";

console.log("Loading assignment page");

function onAssignmentPageLoad(){
	//When the button is clicked start a new interval, which looks for the title of the page being right
	var checkTitle = setInterval(function() {
		//If it is right, it will run the function for hiding the tasks acording to user settings
		//If this is abose 0 the page is loaded
		tableNumbers = $(table + " > tr > td > div > button").length;
		if(($("title").html() === "Assignment Overview" || $("title").html() === "Opgaveoversigt") && tableNumbers > 0){

			//Clear the interval and run the function again
			clearInterval(checkTitle);

			hideTasks(hideTask);
			sortTasks(sortBy);
			fixOverviewButton();

			getStorage('timeFilterTextHide', function(obj) {
				timeFilterTextHide = obj.timeFilterTextHide;
				if(!obj.timeFilterTextHide){

					getStorage('lang', function(obj) {
						if(obj.lang == "dansk"){
							$(".GDSGMNCBF").append("<span id='timeFilter'>Røde opgaver betyder at de skal afleveres før kl " + filterTime + ". Denne tid kan ændres i UD++ indstillinger. Grønne opgaver er ulæste.</span>");
						}else{
							$(".GDSGMNCBF").append("<span id='timeFilter'>Red assignments have a deadline for before " + filterTime + " o'clock. You can change this time in UD++ settings. Green assignments are unread.</span>");
						}
						$( "#timeFilter" ).click(function() {
							$("#timeFilter").remove();
							setStorage({'timeFilterTextHide': true});
						});

					});
				}
			});

		}
	}, 100);
}




//We find out which assignments have a due date before filterTime, and append them a nice little class to identify them.
function markEarlyAssignments() {
	$("table>tbody>tr>td:nth-child(4)>div").each(function() {
		var spaceSplit = this.innerHTML.split(" ");
		if (spaceSplit[spaceSplit.length-1].split(":")[0] < filterTime) {
			$(this).addClass("TooEarly");
		} else {
			$(this).removeClass("TooEarly");
		}

		if (!$(this).hasClass("dowAdded")) {
			var dateText = $(this).html().split(" ")[0].split(".");
			var formattedDateText = "20" + dateText[2] + "-" + dateText[1] + "-" + dateText[0];
			var date = new Date(formattedDateText);
			var dow = date.getDay();
			$(this).html(weekDays[dow] + ", " + $(this).html());
			$(this).addClass("dowAdded");
		}
	});
}

setInterval(markEarlyAssignments, 1000);

//Assign the hidedTasks and sortTasks functions to the asignments button in the menu
var menuButtonInterval = setInterval(function() {
	//Loop untill the button is detected
	if($(".active").length > 0){
		//When it is detected assign the click function to the function that fixes the assignmentspage
		$(".active").click(function(){
			onAssignmentPageLoad();
		});
		clearInterval(menuButtonInterval);
	}
}, 250);

//Try to assign the to overview button's click function to hide the proper assignments
function fixOverviewButton(){
	//Create interval which is looking for the button
	var backToOverviewInterval = setInterval(function() {
		//If the button exsits, then assign the click atrribute to it
		if($(".page-header>div>.btn.btn-mini").length > 0){
			$(".page-header>div>.btn.btn-mini").click(function(){
				onAssignmentPageLoad();
			});
			clearInterval(backToOverviewInterval);
		}
	}, 250);
}

//Initally run the function once when assignements page load
fixOverviewButton();

//Function to hiding already delivered tasks
function hideTasks(hide){
	if(hide){
		$(".page-content").children().eq(1).find("div>div").children().eq(1).find("input").trigger("click");
		$(".page-content").children().eq(1).find("div>div").children().eq(2).find("input").trigger("click");
	}
}

getStorage('hideTask', function (obj) {
	if (!chrome.runtime.error) {
		if(typeof obj.hideTask != "undefined"){
			hideTask = obj.hideTask;
		}else{
			hideTask = false;
		}
	}
});

getStorage('TooEarly', function (obj) {
	if (!chrome.runtime.error) {
		if (typeof obj.TooEarly != "undefined") {
			filterTime = obj.TooEarly;
		}
	}
});

function sortTasks(sort){
	if(sort != -1){
		var element = $("thead > tr").children().eq(sort).get(0);
		element.click();

	}
}

getStorage('sortTaskBy', function (obj) {
	if (!chrome.runtime.error) {
		if(typeof obj.sortTaskBy != "undefined"){
			sortBy = obj.sortTaskBy;
		}else{
			sortBy = 3;
		}
	}
});

var readAssignments = [];

getStorage('readAssignments', function(obj) {
	if (typeof obj.readAssignments !== 'undefined') readAssignments = obj.readAssignments;
});

function saveRead() {
	setStorage({'readAssignments': readAssignments});
}

function getAssignmentTitle() {
	var title = $("h1 > small").html();
	if (title !== "") {
		return [$("h1 > small").html().split(",")[0].substring(2), $("h1 > small").html().split(",")[1].substring(1)];
	} else {
		return "";
	}
}

function saveOpenAssignment() {
	var curAssignment = getAssignmentTitle();
	if (!contains(readAssignments, curAssignment) && curAssignment !== '') {
		readAssignments.push(curAssignment);
		saveRead();
	}
}

function markUnreadAssignments() {
	var assignments =  $("tbody > tr[class]");
	assignments.removeClass("unread");
	assignments.each(function(index) {
		var children = $(this).children();
		var subject = $(children[0]).find("div>div").html()
		var assignmentName = $(children[1]).find("div>div").html()
		var lock = !$(children[5]).find("div>button>i").hasClass("icon-unlock");
		if (!contains(readAssignments, [assignmentName, subject]) && !lock) {
			$(this).addClass("unreadAssignment");
		}
	});
}

function addListeners() {
	$("button.btn.btn-mini:contains(T)").unbind();
	$("button.btn.btn-mini:contains(T)").click(function() {
		window.setTimeout(onAssignmentPageLoad, 1000);
	});
}

window.setInterval(addListeners, 2000);

window.setInterval(saveOpenAssignment, 2000);
window.setInterval(markUnreadAssignments, 2000);

onAssignmentPageLoad();



