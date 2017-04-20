/* THIS FILE IS RESERVED FOR CLASS DECLARATION OF THE GENERAL OBJECT CLASS,
   AND THE FUNCTIONS THAT ARE USED ALONG WITH IT */

//The class for all themable objects of UD++
class PlusPlusObject {
  constructor(selector, applyFunction, properties, flags={"noFlags":true}, value=["rgb(255, 255, 255)"]) {
    this.selector = selector;
    this.applyFunction = applyFunction;
    this.properties = properties;
    this.value = value;
		this.storageSelector;
    this.flags = flags;
  }
  apply(){
    this.applyFunction(this, this.flags);
  }
}

function applyStorageRule(ppobject, flags) {
	getStorage(this.selector, function(obj) {
		if (!chrome.runtime.error) {
			var selector = ppobject.selector.split(" ");
			if (typeof obj[selector[0]] !== 'undefined') {
				var rest = "";
				if (selector.length > 1) {
					for (i=1; i<selector.length; i++) {
						rest = rest + selector[i];
					}
				}
				ppobject.storageSelector = obj[selector[0]] + rest;
				applyCssRule(ppobject, flags);
			} else {
				debugLog("Undefined selector" + selector.toString());
			}
		}
	});
}

function applyCssRule(ppobject, flags) {
	if(typeof flags.important === "undefined") flags.important = true;
	var cssEnd = "";
	if(flags.important) cssEnd = "!important";
	var selector = ppobject.selector;
	if (typeof ppobject.storageSelector !== 'undefined') selector = ppobject.storageSelector;
	for (i = 0; i < ppobject.properties.length; i++){
		$("head").append("<style class='UDPPCustom'>" + selector + "{" + ppobject.properties[i] + ":" + ppobject.value + cssEnd + ";}</style>");
	}
}

function applyBorderRule(ppobject, flags) {
	if(typeof flags.pixels === "undefined") flags.pixels = 1;
	if(typeof flags.important === "undefined") flags.important = true;
	var cssEnd = "";
	if(flags.important) cssEnd = "!important";
	$("head").append("<style class='UDPPCustom'>" + this.selector + "{" + this.properties[0] + ": solid " + flags.pixels + "px " + this.value + cssEnd + ";}</style>");
}



function applyImgRule(ppobject, flags){

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
