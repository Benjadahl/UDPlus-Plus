/* THIS FILE IS RESERVED FOR CLASS DECLARATION OF THE GENERAL OBJECT CLASS,
AND THE FUNCTIONS THAT ARE USED ALONG WITH IT */

//The class for all themable objects of UD++
class PlusPlusObject {
  constructor(selector, applyFunction, properties, flags={"noFlags":true}, value=["rgb(255, 255, 255)"]) {
    this.selector = selector;
    this.applyFunction = applyFunction;
    this.properties = properties;
    this.value = value;
    this.flags = flags;
  }
  apply(){
    this.applyFunction(this.flags);
  }
}

function applyCssRule(flags) {
  if(typeof flags.important === "undefined") flags.important = true;
  var cssEnd = "";
  if(flags.important) cssEnd = "!important";
  for(i = 0; i < this.properties.length; i++){
    $("head").append("<style class='UDPPCustom'>" + this.selector + "{" + this.properties[i] + ":" + this.value + cssEnd + ";}</style>");
  }
}

function applyBorderRule(flags){
  console.log(flags);
  if(typeof flags.pixels === "undefined") flags.pixels = 1;
  if(typeof flags.important === "undefined") flags.important = true;
  var cssEnd = "";
  if(flags.important) cssEnd = "!important";
  $("head").append("<style class='UDPPCustom'>" + this.selector + "{" + this.properties[0] + ": solid " + flags.pixels + "px " + this.value + cssEnd + ";}</style>");
}
