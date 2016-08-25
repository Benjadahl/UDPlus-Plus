//Changeble element 
const colorElements =
	{navBar:{cssSel:".navbar-inner", cssAttr:["background-color"]},
		rightDropdown: {cssSel:".ace-nav>li.light-blue", cssAttr:["background-color"]},
		navbarIcon:{cssSel:".ace-nav>li>a>[class*='icon-']", cssAttr:["color"]},
		tableTop:{cssSel:".GEIF5TWDK- th.GEIF5TWDB-", cssAttr:["background-color", "border-top-color"]},
		menuButtons:{cssSel:".nav-list>li.active>a, .nav-list>li.active>a:hover, .nav-list>li.active>a:focus, .nav-list>li.active>a:active", cssAttr:["color"]},
		skemaButtons:{cssSel:".btn-info", cssAttr:["background-color","border-color"]},
		pile:{cssSel:".nav-list li.active>a:after", cssAttr:["border-right-color"]},
		overSkrift:{cssSel:".page-header h1", cssAttr:["color"]},
		loginBtn:{cssSel:".btn"  , cssAttr:["background-color", "border-color"]},
		arrows:{cssSel:".nav-list li.active>a:after", cssAttr:["border-right-color"]},
		menuFarve:{cssSel:"#menufarve", cssAttr:["background-color"]},
		tableButtons:{cssSel:".btn-info", cssAttr:["background-color","border-color"]},
		arrows:{cssSel:".nav-list li.active>a:after", cssAttr:["border-right-color"]},
		header:{cssSel:"h1", cssAttr:["color"]},
};

//Function for changing color of element
function changeColor (element, color) {
	if(typeof element != "undefined"){
		for(i = 0; i < element.cssAttr.length; i++){
			$(element.cssSel ).each(function () { this.style.setProperty( element.cssAttr[i], color, 'important' ); });
			//$(element.cssSel).css(element.cssAttr[i], color);

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
