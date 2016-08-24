const colorElements =
    {navBar:{cssSel:".navbar-inner", cssAttr:"background-color"},
    rightDropdown: {cssSel:".ace-nav>li.light-blue", cssAttr:"background-color"},
    navbarIcon:{cssSel:".ace-nav>li>a>[class*='icon-']", cssAttr:"color"}};

function changeColor (element, color) {
    $(element.cssSel).css(element.cssAttr, color);
}
