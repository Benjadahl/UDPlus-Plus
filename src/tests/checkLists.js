window.onload = function() {
	//We basically go through the colorElements, and then check if all the objects there also have something in the new system
	for (var style in colorElements) {
		var isIn = false;
		for (var category in PlusPlusList) {
			for (var check in PlusPlusList[category]) {
				if (check == style) isIn = true;
			}
		}
		//We add it to an UL on the page
		if (!isIn) document.getElementById("missing").innerHTML += "<li>" + style + "</li>";
	}
};
