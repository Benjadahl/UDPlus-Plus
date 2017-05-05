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
	var element = $("div:not([class])>.always-visible.ps-container:not(.input-block-level)");
	var height = element.prop('scrollHeight') - element.innerHeight();
	var newPos = element.scrollTop();
	if (newPos == height) {
		if (newPos - lastPos > 200 && !mouseDown) {
			element.scrollTop(lastPos);
			console.log("Fixed scroll height");
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
		$("div:not([class])>.always-visible.ps-container:not(.input-block-level)").scroll(scrollEvent);
	} else {
		window.setTimeout(checkForSelectors, 1000);
	}
}

function fixReplacedCharacters() {
	$('div:not([class])>.always-visible.ps-container:not(.input-block-level) > div:nth-child(2) > div[style*=flex]').find("span").each(function() {
		var oldHTML = $(this).text();
		var newHTML = oldHTML.replace(/&quot;/g, '"');
		newHTML = newHTML.replace(/&#39;/g, "'");
		newHTML = newHTML.replace(/&lt;/g, '<');
		newHTML = newHTML.replace(/&gt;/g, '>');

		if (oldHTML !== newHTML) {
			$(this).text(newHTML);
			console.log("Fixed formatting");
		}
	});
}

window.setInterval(fixReplacedCharacters, 100);
