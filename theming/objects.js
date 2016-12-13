var PlusPlusList = {
  general:{
    navbar:new PlusPlusObject(".navbar-inner", applyCssRule, ["background-color"]),
    rightDropdown:new PlusPlusObject(".ace-nav>li.light-blue", applyCssRule, ["background-color"]),
    navbarIcon:new PlusPlusObject(".ace-nav>li>a>[class*='icon-']", applyCssRule, ["color"]),
    loginBtn:new PlusPlusObject(".btn", applyCssRule, ["background-color", "border-color"]),
    navbarEdge:new PlusPlusObject("#menufarve", applyCssRule, ["background-color"]),
    backEdge:new PlusPlusObject("body", applyCssRule, ["background-color"]),
    tableButtons:new PlusPlusObject(".btn-info", applyCssRule, ["background-color","border-color"]),
    arrows:new PlusPlusObject(".nav-list li.active>a:after", applyCssRule, ["border-right-color"]),
    header:new PlusPlusObject("h1", applyCssRule, ["color"]),
    mainBackground:new PlusPlusObject(".page-content", applyCssRule, ["background"]),
    leftMenuBottom:new PlusPlusObject(".sidebar:before", applyCssRule, ["background-color"]),
    leftMenuBorder:new PlusPlusObject(".sidebar:before", applyBorderRule, ["border-right"]),
    popOutMenuText: new PlusPlusObject(".menu-text", applyCssRule, ["background-color"]),
    sidebarColor: new PlusPlusObject(".sidebar", applyCssRule, ["background-color", "border-right"]),
    mainContainerH: new PlusPlusObject(".main-container", applyCssRule, ["height"]),
    leftMenuArrowBorder: new PlusPlusObject(".nav-list>li.active:after", applyBorderRule, ["border-right"], flags={pixels: 2}),
    leftMenuLI: new PlusPlusObject(".nav-list>li>a", applyCssRule, ["background-color"]),
    mainContainer: new PlusPlusObject(".main-container", applyCssRule, ["background-color"]),
    mainBackImgNoRepeat: new PlusPlusObject(".container-fluid", applyCssRule, ["background-repeat"]),
    leftMenuLIborderTop: new PlusPlusObject(".nav-list>li", applyBorderRule, ["border-top"], flags={pixels: 1}),
    leftMenuLIborderBottom:new PlusPlusObject(".nav-list>li", applyBorderRule, ["border-bottom"], flags={pixels: 1}),
    sidebarCollapse:new PlusPlusObject(".sidebar-collapse", applyCssRule, ["background-color"]),
    sidebarArrow:new PlusPlusObject('.sidebar-collapse>[class*="icon-"]', applyCssRule, ["background-color"]),  //sidebarArrow refers to the arrow inside of the sidebar collapse
    leftMenuTextActive:new PlusPlusObject(".nav-list>li.active>a, .nav-list>li.active>a:hover, .nav-list>li.active>a:focus, .nav-list>li.active>a:active", applyCssRule, ["color"]),
    profileRing:new PlusPlusObject(".round", applyBorderRule, ["border"], flags={pixels: 2}),
    menuText:new PlusPlusObject(".nav-list>li>a", applyCssRule, ["color"]),
    mainText:new PlusPlusObject("body", applyCssRule, ["color"]),
    linkLanguage:new PlusPlusObject("#language>a", applyCssRule, ["color"]),
    studentInfo:new PlusPlusObject(".page-header h1 small", applyCssRule, ["color"]),  //The name studentInfo refers to the schedule page, however this applies to all pages
    outerBackground:new PlusPlusObject("#wrapper", applyCssRule, ["background-color"]),
    schoolEdges:new PlusPlusObject(".ace-nav>li", applyBorderRule, ["border-left"]),
    tableBackground:new PlusPlusObject("tr td", applyCssRule, ["background"]),
    copyrightTop:new PlusPlusObject(".copyright", applyBorderRule, ["border-top"]),
    assignmentText:new PlusPlusObject(".table td", applyCssRule, ["color"]), //assignmentText refers to all text in tables
    absence:new PlusPlusObject(".table thead tr th, .table tr.thead td", applyCssRule, ["background-color"])  //absence refers to all table heads
  },
  start:{},
  schedule:{
    scheduleTopAnnouncements: new PlusPlusObject(".GNK2GVDDPHB", applyCssRule, ["background-color"]),
    tableTopActive:new PlusPlusObject(".GNK2GVDDN- th.GNK2GVDDE-", applyCssRule, ["background-color", "border-top-color"]),
    homeworkMark:new PlusPlusObject(".homeworkLesson", applyCssRule, ["fill"]),
    tableTopText:new PlusPlusObject(".fc-widget-header", applyCssRule, ["color"], flags={"important":false}),
    tableTopTextActive: new PlusPlusObject(".GC0H5P4BK- th.GC0H5P4BB-", applyCssRule, ["color"], flags={"important":false}),
    tableTop: new PlusPlusObject("html body.hoverable div#wrapper div#wrapcontent div.main-container.container-fluid div#main-content.main-content div div.no-select div.page-content div div div div div div table>tbody>tr:first-child", applyCssRule, ["background"]),
    tableLeftSide:new PlusPlusObject(".GNK2GVDDO- table", applyCssRule, ["background"]),
    tableBottom:new PlusPlusObject(".well", applyCssRule, ["background-color"]),
    noteHeader:new PlusPlusObject(".modal-header", applyCssRule, ["background-color"]),
    noteBottom:new PlusPlusObject(".GNK2GVDDCGB", applyCssRule, ["background-color"]),
    filesHeader:new PlusPlusObject(".label-info, .badge-info", applyCssRule, ["background-color"]),
    lessonOpacity:new PlusPlusObject("svg rect", applyCssRule, ["fill-opacity"]),
    lessonDropdownText:new PlusPlusObject("body.hoverable", applyCssRule, ["color"]),
    lessonFill:new PlusPlusObject("svg rect", applyCssRule, ["fill"]),
    lessonStroke:new PlusPlusObject("svg rect", applyCssRule, ["stroke"])
  },
  absence:{
    absenceSlider:new PlusPlusObject(".ui-slider-range", applyCssRule, ["background-color"])
  },
  calendar:{},
  conversations:{
    commentMessageText:new PlusPlusObject(".K1CYATD-u-f", applyCssRule, ["color"]),
    commentWritingBackground:new PlusPlusObject(".gwt-TextArea", applyCssRule, ["background-color"]),
    activeMessage:new PlusPlusObject(".K1CYATD-j-e", applyCssRule, ["background-color"]),
    messageBackground:new PlusPlusObject(".K1CYATD-u-f", applyCssRule, ["background-color"]),
    commentText:new PlusPlusObject(".K1CYATD-q-f", applyCssRule, ["color"])
  },
  plan:{},
  assignments:{
    assignmentsTableActive:new PlusPlusObject(".dataTable th.sorting_desc, .dataTable th.sorting_asc", applyCssRule, ["background-color"]),
    assignmentSetting:new PlusPlusObject(".GD1SXJ-CF", applyCssRule, ["background-color"])
  },
  resources:{},
  grades:{}
};
