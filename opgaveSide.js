
var table = ".page-content > div > div > table > tbody"
var hideTask = "";
var sortBy = 5;

function hideIf(index, value){
  console.log($(table).children("tr")[value]);
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

getStorage('sortTaskBy', function (obj) {
  if (!chrome.runtime.error) {
      if(typeof obj.sortTaskBy != "undefined"){
        sortBy = obj.sortTaskBy;
      }else{
        sortBy = 5;
      }
  }
});

var checkExist = setInterval(function() {
   if ($(table + " > tr > td > div > button").length) {
     $("thead > tr").children().eq(sortBy).trigger("click");

     var tasks = $(table).children();

     console.log(hideTask);


     if(hideTask){
       for(var i = 0; i < tasks.length; i++){
         var button = $(tasks.eq(i).children()[12]).find("div>button");
         if(button.attr("style") == "display: none;"){
            console.log("DONE");
            $(tasks.eq(i)).remove();
         }
       }
     }


      clearInterval(checkExist);
   }
}, 1000);
