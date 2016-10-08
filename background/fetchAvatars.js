$(document).ready(function(){
  console.log($("#frame").contents().find("a").attr("href"));
  console.log($("#frame").attr("src"));
});

setTimeout(function() {
  console.log($("#frame").contents().find("a").attr("href"));
}, 5000);
console.log("test");
