//Changeble element
const colorElements ={
		navbar:{cssSel:".navbar-inner", cssAttr:["background-color"], styleRule: true, isImportant: true, specialBorder: false},
		rightDropdown: {cssSel:".ace-nav>li.light-blue", cssAttr:["background-color"], styleRule: true, isImportant: true, specialBorder: false},
		navbarIcon:{cssSel:".ace-nav>li>a>[class*='icon-']", cssAttr:["color"], styleRule: true, isImportant: true, specialBorder: false},
		tableTopActive:{cssSel:".GNK2GVDDM- th.GNK2GVDDD-", cssAttr:["background-color", "border-top-color"], styleRule: true, isImportant: true, specialBorder: false},
		loginBtn:{cssSel:".btn"  , cssAttr:["background-color", "border-color"], styleRule: true, isImportant: true, specialBorder: false},
		navbarEdge:{cssSel:"#menufarve", cssAttr:["background-color"], styleRule: true, isImportant: true, specialBorder: false},
		backEdge:{cssSel:"body", cssAttr:["background-color"], styleRule: true, isImportant: true, specialBorder: false},
		tableButtons:{cssSel:".btn-info", cssAttr:["background-color","border-color"], styleRule: true, isImportant: true, specialBorder: false},
		arrows:{cssSel:".nav-list li.active>a:after", cssAttr:["border-right-color"], styleRule: true, isImportant: true, specialBorder: false},
		header:{cssSel:"h1", cssAttr:["color"], styleRule: true, isImportant: true, specialBorder: false},
		mainBackground:{cssSel:".page-content", cssAttr:["background"], styleRule: true, isImportant: true, specialBorder: false},
		leftMenuBottom:{cssSel:".sidebar:before", cssAttr:["background-color"], styleRule: true, isImportant: true, specialBorder: false},
		leftMenuBorder:{cssSel:".sidebar:before", cssAttr:["border-right"], styleRule: true, isImportant: true, specialBorder: true},
		leftMenuLI:{cssSel:".nav-list>li>a", cssAttr:["background-color"], styleRule: true, isImportant: true, specialBorder: false},
		leftMenuLIborderTop:{cssSel:".nav-list>li", cssAttr:["border-top"], styleRule: true, isImportant: true, specialBorder: true},
		leftMenuLIborderBottom:{cssSel:".nav-list>li", cssAttr:["border-bottom"], styleRule: true, isImportant: false, specialBorder: true},
		sidebarCollapse:{cssSel:".sidebar-collapse", cssAttr:["background-color"], styleRule: true, isImportant: true, specialBorder: true},
		sideBarCollpaseIcon:{cssSel:'.sidebar-collapse>[class*="icon-"]', cssAttr:["background-color"], styleRule: true, isImportant: true, specialBorder: false},
		tableBottom:{cssSel:".well", cssAttr:["background-color"], styleRule: true, isImportant: true, specialBorder: false},
		tableTop:{cssSel:"html body.hoverable div#wrapper div#wrapcontent div.main-container.container-fluid div#main-content.main-content div div.no-select div.page-content div div div div div div table>tbody>tr:first-child", cssAttr:["background"], styleRule: true, isImportant: true, specialBorder: false},
		tableLeftSide:{cssSel:".GNK2GVDDN- table", cssAttr:["background"], styleRule: true, isImportant: true, specialBorder: false},
		//tableCorner:{cssSel:"html body.hoverable div#wrapper div#wrapcontent div.main-container.container-fluid div#main-content.main-content div div.no-select div.page-content div div div div div div table>tbody>tr:first-child", cssAttr:["background"], styleRule: true, isImportant: true, specialBorder: false},
		lessonFill:{cssSel:"svg rect", cssAttr:["fill"], styleRule: true, isImportant: true, specialBorder: false},
		lessonStroke:{cssSel:"svg rect", cssAttr:["stroke"], styleRule: true, isImportant: true, specialBorder: false},
		outerBackground:{cssSel:"#wrapper", cssAttr:["background-color"], styleRule: true, isImportant: true, specialBorder: false},
		tableButtonsText:{cssSel:".btn", cssAttr:["color"], styleRule: true, isImportant: true, specialBorder: false},
		studentInfo:{cssSel:".page-header h1 small", cssAttr:["color"], styleRule: true, isImportant: true, specialBorder: false},
		navbarText:{cssSel:".navbar .nav>li>a, .navbar .nav>li>a:hover, .navbar .nav>li>a:focus", cssAttr:["color"], styleRule: true, isImportant: true, specialBorder: false},
		messageCounter:{cssSel:".badge", cssAttr:["background-color"], styleRule: true, isImportant: true, specialBorder: false},
		copyRightNotice:{cssSel:".copyright>a", cssAttr:["color"], styleRule: true, isImportant: true, specialBorder: false},
		mainText:{cssSel:"body", cssAttr:["color"], styleRule: true, isImportant: true, specialBorder: false},
		linkLanguage:{cssSel: "#language>a", cssAttr:["color"], styleRule: true, isImportant: true, specialBorder: false},
		tableTopText:{cssSel: ".fc-widget-header", cssAttr:["color"], styleRule: true, isImportant: false, specialBorder: false},
		tableTopTextActive:{cssSel: ".GC0H5P4BK- th.GC0H5P4BB-", cssAttr:["color"], styleRule: true, isImportant: true, specialBorder: false},
		tableRowNote:{cssSel:".GEIF5TWDL- table tr th", cssAttr:["color"], styleRule: true, isImportant: true, specialBorder: false},
		copyrightTop:{cssSel:".copyright", cssAttr:["border-top"], styleRule: true, isImportant: true, specialBorder: true},
		schoolEdges:{cssSel:".ace-nav>li", cssAttr:["border-left"], styleRule: true, isImportant: true, specialBorder: true},
		profileRing:{cssSel:".round", cssAttr:["border"], styleRule: true, isImportant: true, specialBorder: true},
		leftMenuTextActive:{cssSel:".nav-list>li.active>a, .nav-list>li.active>a:hover, .nav-list>li.active>a:focus, .nav-list>li.active>a:active", cssAttr:["color"], styleRule: true, isImportant: true, specialBorder: false},
		leftMenuArrowBorder:{cssSel:".nav-list>li.active:after", cssAttr:["border-right"], styleRule: true, isImportant: true, specialBorder: true},
		tableBackground:{cssSel:"tr td", cssAttr:["background"], styleRule: true, isImportant: true, specialBorder: false},
		lessonOpacity:{cssSel:"svg rect", cssAttr:["fill-opacity"], styleRule: true, isImportant: true, specialBorder: false},
		commentText:{cssSel:".BIQY2BD-n-f", cssAttr:["color"], styleRule: true, isImportant: true, specialBorder: false},
		absence:{cssSel:".table thead tr th, .table tr.thead td", cssAttr:["background-color"], styleRule: true, isImportant: true, specialBorder: false},
		absenceSlider:{cssSel:".ui-slider-range", cssAttr:["background-color"], styleRule: true, isImportant: true, specialBorder: false},
		activity:{cssSel: ".LAAVCED-f-b", cssAttr:["background-color"], styleRule: true, isImportant: true, specialBorder: false},
		menuText:{cssSel: ".nav-list>li>a", cssAttr:["color"], styleRule: true, isImportant: true, specialBorder: false},
		assignmentSetting:{cssSel: ".GD1SXJ-CF", cssAttr:["background-color"], styleRule: true, isImportant: true, specialBorder: false},
		assignmentText:{cssSel: ".table td", cssAttr:["color"], styleRule: true, isImportant: true, specialBorder: false},
		sidebarArrow:{cssSel: ".sidebar-collapse>[class*='icon-']", cssAttr:["background-color"], styleRule: true, isImportant: true, specialBorder: false},
		sidebarCollapse:{cssSel: ".sidebar-collapse", cssAttr:["background-color"], styleRule: true, isImportant: true, specialBorder: false}
};

//Function for changing color of element
function changeColor (element, color) {
	if(typeof element != "undefined"){
		if(element.isImportant){
			var cssEnd = " !important";
		}else{
			var cssEnd = "";
		}
		if(!element.specialBorder){
			for(i = 0; i < element.cssAttr.length; i++){
				if(!element.styleRule){
					$(element.cssSel ).each(function () { this.style.setProperty( element.cssAttr[i], color, 'important' ); });
					//$(element.cssSel).css(element.cssAttr[i], color);
				}else{
					$("head").append("<style class='UDPPCustom'>" + element.cssSel + "{" + element.cssAttr[i] + ":" + color + cssEnd + ";}</style>");
				}
			}
		}else{
			if(element.cssSel === ".round" || element.cssSel === ".nav-list>li.active:after"){
				var pixels = 2;
			}else{
				var pixels = 1;
			}
			$("head").append("<style class='UDPPCustom'>" + element.cssSel + "{" + element.cssAttr[0] + ": solid " + pixels + "px " + color + cssEnd + ";}</style>");
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
