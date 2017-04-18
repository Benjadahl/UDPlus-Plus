window.onload = function() {
	//Stupid performance-wrecking joke
	window.setInterval(function() {
		$(".position-relative > textarea[placeholder]").bind('input', function() {
			var preVal = $(this).val();
			var lennyRegex = new RegExp(/lenny/g);
			var newVal = preVal.replace(lennyRegex, "( ͡° ͜ʖ ͡°)");
			$(this).val(newVal);
		});
	}, 2000);
	checkForSelectors();

}

function checkForSelectors() {
	var classes = $("div>span.gwt-InlineHTML:nth-child(2)").attr("class");
	if (typeof classes !== 'undefined') {
		var selector = classes.split(" ")[1];
		setStorage({'commentTextSelector': "." + selector});
		console.log(selector);
	} else {
		window.setTimeout(checkForSelectors, 1000);
	}
}

