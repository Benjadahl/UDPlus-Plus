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

//Last scrolling position the user got to by scrolling on it's own
var lastPos = 0;

//If the user is currently holding down the mouse
var mouseDown = false;

$("body").mousedown(function() {
	mouseDown = true;
});

$("body").mouseup(function() {
	mouseDown = false;
});

//Called when the user scrolls. If the user is scrolling a bunch, and it isn't holding down it's cursor, we assume it's UDDATA doing it, and revert.
function scrollEvent(e) {
	var element = $(".always-visible.ps-container.ps-active-y");
	var height = element.prop('scrollHeight') - element.innerHeight();
	var newPos = element.scrollTop();
	if (newPos == height) {
		if (newPos - lastPos > 200 && !mouseDown) {
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

