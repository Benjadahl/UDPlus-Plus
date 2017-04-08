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
}
