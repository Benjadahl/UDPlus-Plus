const colorElements =
    {navBar:{cssSel:".navbar-inner", cssAttr:["background-color"]},
    rightDropdown: {cssSel:".ace-nav>li.light-blue", cssAttr:["background-color"]},
    navbarIcon:{cssSel:".ace-nav>li>a>[class*='icon-']", cssAttr:["color"]},
    tableTop:{cssSel:".GEIF5TWDK- th.GEIF5TWDB-", cssAttr:["background-color", "border-top-color"]},
    menuButtons:{cssSel:".nav-list>li.active>a, .nav-list>li.active>a:hover, .nav-list>li.active>a:focus, .nav-list>li.active>a:active", cssAttr:["color"]},
    tableButtons:{cssSel:".btn-info", cssAttr:["background-color","border-color"]},
    arrows:{cssSel:".nav-list li.active>a:after", cssAttr:["border-right-color"]},
    header:{cssSel:"h1", cssAttr:["color"]},
    loginBtn:{cssSel:".btn"  , cssAttr:["background-color", "border-color"]}
    };

function changeColor (element, color) {

    for(i = 0; i < element.cssAttr.length; i++){
      $(element.cssSel ).each(function () { this.style.setProperty( element.cssAttr[i], color, 'important' ); });
      //$(element.cssSel).css(element.cssAttr[i], color);
      console.log(element.cssSel + "   " + element.cssAttr[i]);

    }
}
