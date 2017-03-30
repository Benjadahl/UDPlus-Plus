//Set the current page variable
curPage = "assignments";

var table = ".page-content > div > div > table > tbody"
var hideTask = "";
var sortBy = 5;
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

			hideTasks();
			sortTasks();
			fixOverviewButton();
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
function hideTasks(){
	if(hideTask){
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
		console.log(obj.TooEarly);
		if (typeof obj.TooEarly != "undefined") {
			filterTime = obj.TooEarly;
		}
	}
});

function sortTasks(){
	if(sortBy != -1){
		var element = $("thead > tr").children().eq(sortBy).get(0);
		console.log(typeof element);
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

onAssignmentPageLoad();
