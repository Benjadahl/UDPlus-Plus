//Themes availeble
var themes = {
	"default":{
		"name": "Default",
		"homeworkMark": "#c0392b",
		"warning" : "white",
		"TooEarly" : "red"
	},
	"blue": {"name": "Blue", "navbar": "#0375B4", "navbarEdge" : "#0375B4", "navbarIcon": "#FFFFFF", "rightDropdown": "rgba(0, 0, 0, 0.2)", "homeworkMark": "#ED2939"},
	"black" : {
		"name": "Black",
		"navbar": "rgb(43, 43, 43)",
		"navbarEdge" : "rgb(43, 43, 43)",
		"navbarIcon" : "#FFFFFF",
		"absence": "rgb(43, 43, 43)",
		"absenceSlider": "rgba(0, 0, 0, 0.2)",
		"rightDropdown": "rgba(0, 0, 0, 0.2)",
		"rightDropdownRightEdge": "rgb(43, 43, 43)",
		"profileRing": "#5e5e5d",
		"studentInfo":"#999999",
		"header":"rgb(43, 43, 43)",
		"tableButtons":"rgb(43, 43, 43)",
		"loginBtn":"rgb(43, 43, 43)",
		"tableTopActive":"rgb(43, 43, 43)",
		"lessonFill":"rgb(43, 43, 43)",
		"lessonStroke":"rgba(0, 0, 0, 0)",
		"arrows":"rgb(43, 43, 43)",
		"leftMenuTextActive":"rgb(43, 43, 43)",
		"linkLanguage":"rgb(43, 43, 43)",
		"mainText":"rgb(43, 43, 43)",
		"leftMenuArrowBorder":"rgb(43, 43, 43)",
		"homeworkMark": "#c0392b",
		"lessonOpacity":"0.7",
		"noteHeader":"rgb(43, 43, 43)",
		"filesHeader":"rgb(43, 43, 43)",
		"assignmentsTableActive":"#080707",
		"warning" : "white",
		"TooEarly" : "red"
	},
	"green" : {
		"name": "Green",
		"navbar": "#539e24",
		"navbarIcon" : "#FFFFFF",
		"absence": "#539e24",
		"absenceSlider": "rgb(53, 115, 6)",
		"rightDropdown": "rgb(53, 115, 6)",
		"rightDropdownRightEdge": "#539e24",
		"navbarEdge" : "#539e24",
		"profileRing": "#539e24",
		"studentInfo":"#999999",
		"header":"#539e24",
		"tableButtons":"#539e24",
		"loginBtn":"#539e24",
		"tableTopActive":"#539e24",
		"lessonFill":"#539e24",
		"lessonStroke":"#539e24",
		"arrows":"#539e24",
		"leftMenuTextActive":"#539e24",
		"linkLanguage":"#539e24",
		"mainText":"rgb(53, 115, 6)",
		"leftMenuArrowBorder":"#539e24",
		"lessonOpacity":"0.7",
		"homeworkMark": "#ED2939",
		"noteHeader":"#539e24",
		"filesHeader":"#539e24",
		"TooEarly" : "red",
		"warning" : "white"
	},
	"red" : {
		"name": "Red",
		"navbar": "#B22222",
		"navbarEdge" : "#B22222",
		"navbarIcon" : "#FFFF99",
		"absence": "#B22222",
		"absenceSlider": "rgba(0, 0, 0, 0.2)",
		"rightDropdown": "rgba(0, 0, 0, 0.2)",
		"rightDropdownRightEdge": "#B22222",
		"profileRing": "#B22222",
		"studentInfo":"#999999",
		"header":"#B22222",
		"tableButtons":"#B22222",
		"loginBtn":"#B22222",
		"tableTopActive":"#B22222",
		"lessonStroke":"#e74c3c",
		"lessonFill":"rgba(0,0,0,0)",
		"arrows":"#B22222",
		"leftMenuTextActive":"#B22222",
		"linkLanguage":"#B22222",
		"mainText":"#B22222",
		"leftMenuArrowBorder":"#B22222",
		"lessonOpacity":"0.7",
		"homeworkMark": "#e74c3c",
		"noteHeader":"#B22222",
		"filesHeader":"#B22222",
		"assignmentsTableActive":"#e74c3c",
		"TooEarly" : "red",
		"warning" : "white"
	},
	"dark" : {
		"name": "Dark",
		"navbar": "#0d0d0d",
		"navbarIcon" : "#ababab",
		"rightDropdown": "#1f1e1e",
		"navbarEdge": "#0d0d0d",
		"backEdge": "#414141",
		"absence": "#0d0d0d",
		"absenceSlider": "#0d0d0d",
		"rightDropdownRightEdge": "#0d0d0d",
		"profileRing": "#ababab",
		"schoolEdges":"#ababab",
		"navbarText":"#dfdede",
		"menuButtons":"#dfdede",
		"mainBackground":"#393939",
		"header":"#d6c91d",
		"studentInfo":"#999999",
		"outerBackground":"#393939",
		"tableButtons":"#ada315",
		"tableButtonsText":"#000000",
		"loginBtn":"#ada315",
		"tableTop":"#2b2b2b",
		"tableLeftSide":"#2b2b2b",
		"tableCorner":"#464646",
		"tableTopActive":"#ada315",
		"lessonFill":"#cbcbcb",
		"lessonStroke":"#ada315",
		"tableBottom":"#ada315",
		"leftMenuBottom":"#2a2a2a",
		"leftMenuLI":"#2a2a2a",
		"arrows":"#ada315",
		"leftMenuTextActive":"#ada315",
		"leftMenuBorder":"#414141",
		"leftMenuLIborderTop":"#414141",
		"leftMenuLIborderBottom":"#414141",
		"copyrightTop":"#414141",
		"languageBackground":"#2a2a2a",
		"linkLanguage":"#8e8e8e",
		"mainText":"#757575",
		"menuText": "#FFFFFF",
		"leftMenuArrowBorder":"#ada315",
		"tableBackground":"#707070",
		"lessonOpacity":"1",
		"commentText":"#757575",
		"assignmentSetting": "#0d0d0d",
		"assignmentText": "#FFFFFF",
		"sidebarArrow": "#707070",
		"sidebarCollapse": "#2b2b2b",
		"homeworkMark": "#ED2939",
		"noteHeader":"#ada315",
		"filesHeader":"#ada315",
		"noteBottom":"#414141",
		"assignmentsTableActive":"#ada315",
		"mainContainer" : "#393939",
		"messageBackground": "#393939",
		"messageBackgroundText": "rgba(0,0,0,0)",
		//"commentWritingBackground": "#393939",
		"noteBackTextColour":"rgba(0, 0, 0, 0)",
		"TooEarly" : "red",
		"warning" : "#757575"
	},
	"wallDemo" : {
		"name" : "Wallpaper_Demo",
		"leftMenuArrowBorder" : "#89042F",
		"mainText" : "#FFFFFF",
		"tableButtons" : "#89042F",
		"header" : "#89042F",
		"menuButtons" : "#89042F",
		"sidebarArrow" : "#89042F",
		//"popOutMenuText" : "#89042F",
		"absenceSlider" : "#89042F",
		"profileRing" : "#89042F",
		"arrows" : "#89042F",
		"tableTopActive" : "#89042F",
		"loginBtn" : "#89042F",
		"leftMenuTextActive" : "#89042F",
		"absence" : "#89042F",
		"copyrightTop" : "#FFFFFF",
		"linkLanguage":"#FFFFFF",
		"leftMenuLIborderBottom" : "rgba(0,0,0,0)",
		"leftMenuBorder" : "#B0053C",
		"leftMenuLI" : "rgba(0,0,0,0)",
		"sidebarColor" : "rgba(0,0,0,0)",
		"leftMenuBottom" : "#B0053C",
		"sidebarCollapse" : "rgba(0,0,0,0)",
		"leftMenuLIborderTop" : "rgba(0,0,0,0)",
		"assignmentSetting" : "#B0053C",
		//License site: http://www.uhdwallpapers.org/2014/09/summer-2014-grand-canyon.html?m=1
		"mainBackImg" : "https://4.bp.blogspot.com/-Y63PB8ns7G0/VCTwQuLhZfI/AAAAAAABOmA/2ULXhjuWGMY/s0/Summer%2B2014%2BGrand%2BCanyon.jpg",
		"bodyBGAttachment": "fixed",
		"bodyBGPos": "center",
		"bodyBGRepeat": "no-repeat",
		"bogyBGSize" : "cover",
		"bottomBorder": "none",
		"rightBorder": "none",
		"leftBorder": "none",
		"homeworkMark" : "#FFB406",
		"lessonStroke" : "#89042F",
		"lessonOpacity" : "0.5",
		"menuText" : "#FFFFFF",
		"navbar" : "#89042F",
		"rightDropdown" : "#89042F",
		"navbarEdge" : "#89042F",
		"navbarImg" : "http://i.imgur.com/ex7rXzY.png",
		"activeMessage" : "rgba(176, 5, 60, 0.3)",
		"commentText":"#FFFFFF",
		"messageBackground" : "rgba(176, 5, 60, 0.3)",
		"tableLeftSide":"rgba(176, 5, 60, 0.3)",
		"scheduleTopAnnouncements":"rgba(176, 5, 60, 0.5)",
		"assignmentsTableActive" : "#690223",
	"lessonDropdownText": "#363636",
		//"commentWritingBackground": "rgba(176, 5, 60, 0.3)",
		"commentMessageText":"#FFFFFF",
		"TooEarly" : "red",
		"warning" : "white"
	},
	"base16" : {
		"name": "Base16 dark",
		"navbar": "#1D1F21",
		"navbarIcon" : "#A54242",
		"rightDropdown": "#1D1F21",
		"navbarEdge": "#1D1F21",
		"backEdge": "#1D1F21",
		"absence": "#A54242",
		"absenceSlider": "#A54242",
		"rightDropdownRightEdge": "#1D1F21",
		"profileRing": "#A54242",
		"schoolEdges":"#282A2E",
		"navbarText":"#C5C8C6",
		"menuButtons":"#A54242",
		"mainBackground":"#373B41",
		"header":"#A54242",
		"studentInfo":"#5F819D",
		"outerBackground":"#373B41",
		"tableButtons":"#A54242",
		"tableButtonsText":"#C5C8C6",
		"loginBtn":"#A54242",
		"tableTop":"#2b2b2b",
		"tableLeftSide":"#2b2b2b",
		"tableCorner":"#464646",
		"tableTopActive":"#A54242",
		"lessonFill":"#C5C8C6",
		"lessonStroke":"#CC6666",
		"tableBottom":"#373B41",
		"leftMenuBottom":"#2a2a2a",
		"leftMenuLI":"#2a2a2a",
		"arrows":"#A54242",
		"leftMenuTextActive":"#A54242",
		"leftMenuBorder":"#A54242",
		"leftMenuLIborderTop":"#414141",
		"leftMenuLIborderBottom":"#414141",
		"copyrightTop":"#A54242",
		"linkLanguage":"#A54242",
		"mainText":"#C5C8C6",
		"menuText": "#C5C8C6",
		"leftMenuArrowBorder":"#A54242",
		"tableBackground":"#373B41",
		"lessonOpacity":"1",
		"commentText":"#C5C8C6",
		"assignmentSetting": "#282A2E",
		"assignmentText": "#C5C8C6",
		"sidebarArrow": "#A54242",
		"sidebarCollapse": "#A54242",
		"assignmentsTableActive" : "#8a3434",
		"mainContainer" : "#373B41",
		"noteHeader":"#A54242",
		"filesHeader":"#A54242",
		"homeworkMark": "#A54242",
		"TooEarly" : "red",
		"warning" : "#C5C8C6"
	}
};

//These are the options that the client can change
var customTemplate = {"Navigationbar" : ["navbar", "rightDropdown", "navbarEdge"],
											"Background1" : ["mainBackground", "outerBackground", "backEdge", "mainContainer"],
											"Background2" : ["copyrightTop", "leftMenuLIborderBottom","89042F" ,"leftMenuBorder", "leftMenuLI", "leftMenuBottom", "sidebarCollapse", "leftMenuLIborderTop", "assignmentSetting"] ,
											"Background3" : [ "tableBackground"],
											"Accent" : ["leftMenuArrowBorder", "tableButtons", "header", "menuButtons","sidebarArrow", "absenceSlider", "profileRing",  "arrows", "tableTopActive", "loginBtn", "leftMenuTextActive", "absence"],
											"Text" : ["warning", "mainText", "assignmentText", "commentText", "tableButtonsText"],
											"Menu_button_text" : ["menuText"],
											"Lesson_Transparent" : ["lessonOpacity"],
											"Lesson_Color" : ["lessonFill"],
											"Lesson_Border_Color" : ["lessonStroke"],
											"Schedule_Rows" : ["tableLeftSide"],
											"Schedule_Columns" : ["tableTop"],
											"Schedule_Bottom" : ["tableBottom"],
											"Homework_color" : ["homeworkMark"],
											"Navigationbar_image" : ["navbarImg"],
											"BackgroundImg_BETA" : ["mainBackImg"]
										 };

var customTheme = {}


var themeConvert = {
	"navbar" : "Navigationbar",
	"mainBackground" : "Background1",
	"leftMenuBottom" : "Background2",
	"tableBackground" : "Background3",
	"tableButtons" : "Accent",
	"mainText" : "Text",
	"menuText" : "Menu_button_text",
	"lessonOpacity" : "Lesson_Transparent",
	"lessonFill" : "Lesson_Color",
	"lessonStroke" : "Lesson_Border_Color",
	"tableLeftSide" : "Schedule_Rows",
	"tableTop" : "Schedule_Columns",
	"tableBottom" : "Schedule_Bottom",
	"homeworkMark" : "Homework_color",
	"navbarImg" : "Navigationbar_image",
	"mainBackImg" : "BackgroundImg_BETA"


}
