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

var lastPos = 0;
function scrollEvent(e) {
	var element = $(".always-visible.ps-container.ps-active-y");
	var height = element.prop('scrollHeight') - element.innerHeight();
	var newPos = element.scrollTop();
	if (newPos == height) {
		if (newPos - lastPos > 60) {
			element.scrollTop(lastPos);
			console.log("Fixed scroll height;");
		}
	} else {
		lastPos = newPos;
	}
}

function checkForSelectors() {
	var classes = $("div>span.gwt-InlineHTML:nth-child(2)").attr("class");
	if (typeof classes !== 'undefined') {
		var selector = classes.split(" ")[1];
		setStorage({'commentTextSelector': "." + selector});
		$(".always-visible.ps-container.ps-active-y").scroll(scrollEvent);
	} else {
		window.setTimeout(checkForSelectors, 1000);
	}
}

