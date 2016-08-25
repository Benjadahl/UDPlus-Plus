const colorElements =
	{navBar:{cssSel:".navbar-inner", cssAttr:["background-color"], styleRule: false},
		rightDropdown: {cssSel:".ace-nav>li.light-blue", cssAttr:["background-color"], styleRule: false},
		navbarIcon:{cssSel:".ace-nav>li>a>[class*='icon-']", cssAttr:["color"], styleRule: false},
		tableTop:{cssSel:".GEIF5TWDK- th.GEIF5TWDB-", cssAttr:["background-color", "border-top-color"], styleRule: false},
		menuButtons:{cssSel:".nav-list>li.active>a, .nav-list>li.active>a:hover, .nav-list>li.active>a:focus, .nav-list>li.active>a:active", cssAttr:["color"], styleRule: false},
		skemaButtons:{cssSel:".btn-info", cssAttr:["background-color","border-color"], styleRule: false},
		pile:{cssSel:".nav-list li.active>a:after", cssAttr:["border-right-color"], styleRule: false},
		overSkrift:{cssSel:".page-header h1", cssAttr:["color"], styleRule: false},
		loginBtn:{cssSel:".btn"  , cssAttr:["background-color", "border-color"], styleRule: false},
		arrows:{cssSel:".nav-list li.active>a:after", cssAttr:["border-right-color"], styleRule: false},
		menuFarve:{cssSel:"#menufarve", cssAttr:["background-color"], styleRule: false},
		tableButtons:{cssSel:".btn-info", cssAttr:["background-color","border-color"], styleRule: false},
		arrows:{cssSel:".nav-list li.active>a:after", cssAttr:["border-right-color"], styleRule: false},
		header:{cssSel:"h1", cssAttr:["color"], styleRule: false},
		mainBackground:{cssSel: ".page-content", cssAttr:["background"], styleRule: false},
		leftMenuBottom:{cssSel: ".sidebar:before", cssAttr:["background-color"], styleRule: true},
		leftMenuBorder:{cssSel: ".sidebar:before", cssAttr:["border-right"], styleRule: true}
};

function changeColor (element, color) {
	if(typeof element != "undefined"){
		if(!element.styleRule){
			for(i = 0; i < element.cssAttr.length; i++){
				$(element.cssSel ).each(function () { this.style.setProperty( element.cssAttr[i], color, 'important' ); });
				//$(element.cssSel).css(element.cssAttr[i], color);
			}
		}else{
			$("head").append("<style>" + element.cssSel + "{" + element.cssAttr[0] + ":" + color + " !important;}</style>");
		}
	}
}

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
