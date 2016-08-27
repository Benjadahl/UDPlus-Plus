
var table = ".page-content > div > table > tbody"

function hideIf(index, value){
  console.log($(table).children("tr")[value]);
}


var checkExist = setInterval(function() {
   if ($(table + " > tr > td > div > button").length) {
     $("thead > tr").children().eq(5).trigger("click");

     var tasks = $(table).children();

     console.log("Hej med " + tasks.length);



     for(var i = 0; i < tasks.length; i++){
       var button = $(tasks.eq(i).children()[12]).find("div>button");
       if(button.attr("style") == "display: none;"){
          console.log("DONE");
          $(tasks.eq(i)).remove();
       }
     }


      clearInterval(checkExist);
   }
}, 1000);
