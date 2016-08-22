function navbarColor(color){
    $(".navbar-inner").css("background-color",color);
}
function rightDropdown(color){
    $(".ace-nav>li.light-blue").css("background-color",color);
}
function navbarIcon(color){
    $(".ace-nav>li>a>[class*='icon-']").css("color",color);
}
navbarColor("green");
rightDropdown("green");
navbarIcon("green");
