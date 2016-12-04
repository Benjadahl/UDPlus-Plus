var PlusPlusList = {
  general:{
    navbar:new PlusPlusObject(".navbar-inner", applyCssRule, ["background-color"]),
    rightDropdown:new PlusPlusObject(".ace-nav>li.light-blue", applyCssRule, ["background-color"]),
    navbarIcon:new PlusPlusObject(".ace-nav>li>a>[class*='icon-']", applyCssRule, ["color"]),
    tableTopActive:new PlusPlusObject(".GNK2GVDDN- th.GNK2GVDDE-", applyCssRule, ["background-color", "border-top-color"]),
    leftMenuLIborderBottom:new PlusPlusObject(".nav-list>li", applyBorderRule, ["border-bottom"], flags={pixels: 1}),
    popOutMenuText: new PlusPlusObject(".menu-text", applyCssRule, ["background-color"]),
    sidebarColor: new PlusPlusObject(".sidebar", applyCssRule, ["background-color", "border-right"]),
    mainContainerH: new PlusPlusObject(".main-container", applyCssRule, ["height"]),
    mainContainer: new PlusPlusObject(".main-container", applyCssRule, ["background-color"]),
    mainBackImgNoRepeat: new PlusPlusObject(".container-fluid", applyCssRule, ["background-repeat"])
    

  },
  start:{},
  schedule:{
    scheduleTopAnnouncements: new PlusPlusObject(".GNK2GVDDPHB", applyCssRule, ["background-color"])
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
}
