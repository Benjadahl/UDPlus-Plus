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
    this.applyFunction(this, this.flags);
  }
}

function applyStorageRule(ppobject, flags) {
	getStorage(this.selector, function(obj) {
		if (!chrome.runtime.error) {
			ppobject.selector = obj[ppobject.selector];
			applyCssRule(ppobject, flags);
		}
	});
}

function applyCssRule(ppobject, flags) {
	if(typeof flags.important === "undefined") flags.important = true;
	var cssEnd = "";
	if(flags.important) cssEnd = "!important";
	for (i = 0; i < ppobject.properties.length; i++){
		$("head").append("<style class='UDPPCustom'>" + ppobject.selector + "{" + ppobject.properties[i] + ":" + ppobject.value + cssEnd + ";}</style>");
	}
}

function applyBorderRule(flags){
	if(typeof flags.pixels === "undefined") flags.pixels = 1;
	if(typeof flags.important === "undefined") flags.important = true;
	var cssEnd = "";
	if(flags.important) cssEnd = "!important";
	$("head").append("<style class='UDPPCustom'>" + this.selector + "{" + this.properties[0] + ": solid " + flags.pixels + "px " + this.value + cssEnd + ";}</style>");
}



function applyImgRule(flags){

	//Adding important option
	if(typeof flags.important === "undefined") flags.important = true;
	var cssEnd = "";
	if(flags.important) cssEnd = "!important";

	//This argument should be given as an array
	elements = flags.elements;

	//Check if there are elements that should be transparent
	if(typeof elements !== "undefined"){
		for (var i = 0; i < elements.length; i++) {
			applySelector(elements[i], "rgba(0,0,0,0)", curPage);
		}
	}

	//Check if image is background, if true set neccesary settings.
	if(flags.backImg){

		applySelector("mainContainerH", (window.innerHeight-45) + "px", curPage);

		applySelector("mainBackImgFill", "cover", curPage);
	}

	//Apply the actual image
	$("head").append("<style class='UDPPCustom'>" + this.selector + "{" + this.properties[0] + ": url(" + this.value + ")" + cssEnd + ";}</style>");

}
