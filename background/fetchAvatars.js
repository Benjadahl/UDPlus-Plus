$(document).ready(function(){
  console.log($("#frame").contents().find("a").attr("href"));
  console.log($("#frame").attr("src"));
});

setTimeout(function() {
  //console.log($("#frame").contents().find("a").attr("href"));
  //console.log($("#frame").html());
  //console.log(document.getElementById("frame").contentDocument);
}, 5000);
console.log("test");
var xhr = new XMLHttpRequest();
xhr.open("GET","https://www.uddataplus.dk/besked/",false);
xhr.send();

var result = xhr.responseText;



setInterval(function() {
  console.log(result);
}, 1000);
