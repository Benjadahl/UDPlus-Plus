//Changeble element
const colorElements ={
		navBar:{cssSel:".navbar-inner", cssAttr:["background-color"], styleRule: true},
		rightDropdown: {cssSel:".ace-nav>li.light-blue", cssAttr:["background-color"], styleRule: true},
		navbarIcon:{cssSel:".ace-nav>li>a>[class*='icon-']", cssAttr:["color"], styleRule: true},
		tableTop:{cssSel:".GEIF5TWDK- th.GEIF5TWDB-", cssAttr:["background-color", "border-top-color"], styleRule: true},
		menuButtons:{cssSel:".nav-list>li.active>a, .nav-list>li.active>a:hover, .nav-list>li.active>a:focus, .nav-list>li.active>a:active", cssAttr:["color"], styleRule: true},
		skemaButtons:{cssSel:".btn-info", cssAttr:["background-color","border-color"], styleRule: true},
		overSkrift:{cssSel:".page-header h1", cssAttr:["color"], styleRule: true},
		loginBtn:{cssSel:".btn"  , cssAttr:["background-color", "border-color"], styleRule: true},
		rightDropdownRightEdge:{cssSel:"#menufarve", cssAttr:["background-color"], styleRule: true},
		tableButtons:{cssSel:".btn-info", cssAttr:["background-color","border-color"], styleRule: true},
		arrows:{cssSel:".nav-list li.active>a:after", cssAttr:["border-right-color"], styleRule: true},
		header:{cssSel:"h1", cssAttr:["color"], styleRule: true},
		mainBackground:{cssSel:".page-content", cssAttr:["background"], styleRule: true},
		leftMenuBottom:{cssSel:".sidebar:before", cssAttr:["background-color"], styleRule: true},
		leftMenuBorder:{cssSel:".sidebar:before", cssAttr:["border-right"], styleRule: true},
		leftMenuLI:{cssSel:".nav-list>li>a", cssAttr:["background-color"], styleRule: true},
		leftMenuLIborderTop:{cssSel:".nav-list>li>a", cssAttr:["border-top"], styleRule: true},
		sidebarCollapse:{cssSel:".sidebar-collapse", cssAttr:["background-color"], styleRule: true},
		sideBarCollpaseIcon:{cssSel:'.sidebar-collapse>[class*="icon-"]', cssAttr:["background-color"], styleRule: true},
		tableBottom:{cssSel:".well", cssAttr:["background-color"], styleRule: true}
};

//Function for changing color of element
function changeColor (element, color) {
	if(typeof element != "undefined"){
		for(i = 0; i < element.cssAttr.length; i++){
			if(!element.styleRule){
				$(element.cssSel ).each(function () { this.style.setProperty( element.cssAttr[i], color, 'important' ); });
				//$(element.cssSel).css(element.cssAttr[i], color);
			}else{
				$("head").append("<style>" + element.cssSel + "{" + element.cssAttr[i] + ":" + color + " !important;}</style>");
			}
		}

	}
}

//Firefox and chrome settings manager
function getStorage(name, callback) {
	//Check if chrome sync is enabled
	if (navigator.userAgent.includes("Chrome")) {
		//Chrome sync is enabled
		chrome.storage.sync.get(name, callback);
	} else {
		//Chrome sync is disabled.
		chrome.storage.local.get(name, callback);
	}
}

//Firefox and chrome settings manager
function setStorage(value) {
	if (navigator.userAgent.includes("Chrome")) {
		//Chrome sync is enabled
		chrome.storage.sync.set(value);
	} else {
		//Chrome sync is disabled.
		chrome.storage.local.set(value);
	}
}
