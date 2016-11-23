var PlusPlusList = {
  general:{
    navbar:new PlusPlusObject(".navbar-inner", applyCssRule, "background-color", "rgb(15, 49, 193)"),
    rightDropdown:new PlusPlusObject(".ace-nav>li.light-blue", applyCssRule, "background-color", "rgb(255, 0, 0)"),
    navbarIcon:new PlusPlusObject(".ace-nav>li>a>[class*='icon-']", applyCssRule, "color", "rgb(97, 255, 0)"),
    tableTopActive:new PlusPlusObject(".GNK2GVDDN- th.GNK2GVDDE-", applyCssRule, "background-color", "rgb(242, 255, 0)")
  },
  start:{},
  schedule:{},
  absence:{},
  calender:{},
  conversations:{},
  plan:{},
  assignemnets:{},
  resources:{},
  grades:{}
}

setTimeout(function() {
  const page = PlusPlusList.general;
  for(var element in page){
    console.log(element);
    page[element].apply();
  }
}, 5000);
