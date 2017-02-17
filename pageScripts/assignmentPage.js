//Set the current page variable
curPage = "assignments";

var table = ".page-content > div > div > table > tbody"
var hideTask = "";
var sortBy = 5;

console.log("Loading assignment page");

function onAssignmentPageLoad(){
  //When the button is clicked start a new interval, which looks for the title of the page being right
  var checkTitle = setInterval(function() {
    //If it is right, it will run the function for hiding the tasks acording to user settings
    console.log("AwesomeTest");
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


