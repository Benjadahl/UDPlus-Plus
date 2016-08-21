$(document).ready(function(){
  console.log("Uddata++ starting");
  $(".navbar-inner").css("background-color","red");
  $(".ace-nav>li>a>[class*='icon-']").css("color","red");
  $(".ace-nav>li.light-blue").css("background","red");
  $("#navbar>div>div>a>img").attr("src", chrome.extension.getURL("UddataLogo.png"));
});
