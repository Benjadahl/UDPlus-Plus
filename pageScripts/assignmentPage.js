
var table = ".page-content > div > div > table > tbody"
var hideTask = "";
var sortBy = 5;


//Try to assign the to overview button's click function to hide the proper assignments
function fixOverviewButton(){
  //Create interval which is looking for the button
  var backToOverviewInterval = setInterval(function() {
    //If the button exsits, then assign the click atrribute to it
     if($(".page-header>div>.btn.btn-mini").length > 0){
       $(".page-header>div>.btn.btn-mini").click(function(){
         //When the button is clicked start a new interval, which looks for the title of the page being right
         var checkTitle = setInterval(function() {
           //If it is right, it will run the function for hiding the tasks acording to user settings
           if($("title").html() === "Assignment Overview"){
             hideTasks();
             sortTasks();
             //Clear the interval and run the function again
             clearInterval(checkTitle);
             fixOverviewButton();
           }
        }, 100);
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
    $("thead > tr").children().eq(sortBy).trigger("click");
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

var checkExist = setInterval(function() {
   if ($(table + " > tr > td > div > button").length) {
     sortTasks();
     var tasks = $(table).children();

     hideTasks();
     clearInterval(checkExist);
   }
}, 200);
