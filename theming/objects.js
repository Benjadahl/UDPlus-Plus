var PlusPlusList = {
  general:{
    navbar:new PlusPlusObject(".navbar-inner", applyCssRule, ["background-color"]),
    rightDropdown:new PlusPlusObject(".ace-nav>li.light-blue", applyCssRule, ["background-color"]),
    navbarIcon:new PlusPlusObject(".ace-nav>li>a>[class*='icon-']", applyCssRule, ["color"]),
    loginBtn:new PlusPlusObject(".btn", applyCssRule, ["background-color", "border-color"]),
    navbarEdge:new PlusPlusObject("#menuFarve", applyCssRule, ["background-color"]),
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
    homeworkMark:new PlusPlusObject(".homeworkLesson", applyCssRule, ["fill"]),
    sidebarCollapse:new PlusPlusObject(".sidebar-collapse", applyCssRule, ["background-color"]),
    sidebarArrow:new PlusPlusObject('.sidebar-collapse>[class*="icon-"]', applyCssRule, ["background-color"])
    
  },
  start:{}, 
  schedule:{
    scheduleTopAnnouncements: new PlusPlusObject(".GNK2GVDDPHB", applyCssRule, ["background-color"]),
    tableTopActive:new PlusPlusObject(".GNK2GVDDN- th.GNK2GVDDE-", applyCssRule, ["background-color", "border-top-color"]),
    tableBackground:new PlusPlusObject("tr td", applyCssRule, ["background"])
  },
  absence:{},
  calender:{},
  conversations:{
    commentMessageText: new PlusPlusObject(".K1CYATD-u-f", applyCssRule, ["color"]),
    commentWritingBackground: new PlusPlusObject(".gwt-TextArea", applyCssRule, ["background-color"]),
    activeMessage: new PlusPlusObject(".K1CYATD-j-e", applyCssRule, ["background-color"]),
    messageBackground: new PlusPlusObject(".K1CYATD-u-f", applyCssRule, ["background-color"])
  },
  plan:{},
  assignemnets:{
    assignmentsTableActive: new PlusPlusObject(".dataTable th.sorting_desc, .dataTable th.sorting_asc", applyCssRule, ["background-color"])
  },
  resources:{},
  grades:{}
};
