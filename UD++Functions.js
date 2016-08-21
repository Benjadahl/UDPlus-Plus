function navbarColor(color){
    document.getElementsByClassName("navbar-inner")[0].style.backgroundColor = color;
}
function rightDropdown(color){
    document.querySelector(".ace-nav>li.light-blue").style.backgroundColor = color;
}
navbarColor("green");
rightDropdown("green");
