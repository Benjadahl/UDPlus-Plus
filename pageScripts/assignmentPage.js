
var table = ".page-content > div > div > table > tbody"
var hideTask = "";
var sortBy = 5;




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

     if(hideTask){
       $(".page-content").children().eq(1).find("div>div").children().eq(1).find("input").trigger("click");
       $(".page-content").children().eq(1).find("div>div").children().eq(2).find("input").trigger("click");
     }
      clearInterval(checkExist);
   }
}, 1000);
