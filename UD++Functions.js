const colorElements =
	{navBar:{cssSel:".navbar-inner", cssAttr:["background-color"]},
		rightDropdown: {cssSel:".ace-nav>li.light-blue", cssAttr:["background-color"]},
		navbarIcon:{cssSel:".ace-nav>li>a>[class*='icon-']", cssAttr:["color"]},
		skemaTop:{cssSel:".GEIF5TWDK- th.GEIF5TWDB-", cssAttr:["background-color", "border-top-color"]},
		menuButtons:{cssSel:".nav-list>li.active>a, .nav-list>li.active>a:hover, .nav-list>li.active>a:focus, .nav-list>li.active>a:active", cssAttr:["color"]},
		skemaButtons:{cssSel:".btn-info", cssAttr:["background-color","border-color"]},
		pile:{cssSel:".nav-list li.active>a:after", cssAttr:["border-right-color"]},
		overSkrift:{cssSel:"h1", cssAttr:["color"]}
};

function changeColor (element, color) {

	for(i = 0; i < element.cssAttr.length; i++){
		$(element.cssSel ).each(function () { this.style.setProperty( element.cssAttr[i], color, 'important' ); });
		//$(element.cssSel).css(element.cssAttr[i], color);

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

function setStorage(value) {
	if (navigator.userAgent.includes("Chrome")) {
		//Chrome sync is enabled
		chrome.storage.sync.set(value);
	} else {
		//Chrome sync is disabled.
		chrome.storage.local.set(value);
	}
}
