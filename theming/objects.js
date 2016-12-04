var PlusPlusList = {
  general:{
    navbar:new PlusPlusObject(".navbar-inner", applyCssRule, ["background-color"]),
    rightDropdown:new PlusPlusObject(".ace-nav>li.light-blue", applyCssRule, ["background-color"]),
    navbarIcon:new PlusPlusObject(".ace-nav>li>a>[class*='icon-']", applyCssRule, ["color"]),
    tableTopActive:new PlusPlusObject(".GNK2GVDDN- th.GNK2GVDDE-", applyCssRule, ["background-color", "border-top-color"]),
    leftMenuLIborderBottom:new PlusPlusObject(".nav-list>li", applyBorderRule, ["border-bottom"], flags={pixels: 1}),
    loginBtn:new PlusPlusObject(".btn", applyCssRule, ["background-color", "border-color"]),
    navbarEdge:new PlusPlusObject("#menuFarve", applyCssRule, ["background-color"]),
    backEdge:new PlusPlusObject("body", applyCssRule, ["background-color"]),
    tableButtons:new PlusPlusObject(".btn-info", applyCssRule, ["background-color","border-color"]),
    arrows:new PlusPlusObject(".nav-list li.active>a:after", applyCssRule, ["border-right-color"]),
    header:new PlusPlusObject("h1", applyCssRule, ["color"]),
    mainBackground:new PlusPlusObject(".page-content", applyCssRule, ["background"]),
    leftMenuBottom:new PlusPlusObject(".sidebar:before", applyCssRule, ["background-color"]),
    leftMenuBorder:new PlusPlusObject(".sidebar:before", applyBorderRule, ["border-right"])
    
  },
  start:{},
  schedule:{
    
  },
  absence:{
  },
  calender:{},
  conversations:{},
  plan:{},
  assignemnets:{},
  resources:{},
  grades:{}
};
