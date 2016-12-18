window.onload = function() {
	for (var style in colorElements) {
		var isIn = false;
		for (var category in PlusPlusList) {
			for (var check in PlusPlusList[category]) {
				if (check == style) isIn = true;
			}
		}
		if (!isIn) document.getElementById("missing").innerHTML += "<li>" + style + "</li>";
	}
};
