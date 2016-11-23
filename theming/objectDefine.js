/* THIS FILE IS RESERVED FOR CLASS DECLARATION OF THE GENERAL OBJECT CLASS,
AND THE FUNCTIONS THAT ARE USED ALONG WITH IT */

//The class for all themable objects of UD++
class PlusPlusObject {
  constructor(selector, applyFunction, property, value="rgb(255, 255, 255)", important=true) {
    this.selector = selector;
    this.applyFunction = applyFunction;
    this.property = property;
    this.value = value;
    this.important = important;
  }
  apply(){
    this.applyFunction(this.important);
  }
}

function applyCssRule(important) {
  var cssEnd = "";
  if(important) cssEnd = "!important";
  $("head").append("<style class='UDPPCustom'>" + this.selector + "{" + this.property + ":" + this.value + cssEnd + ";}</style>");
}
