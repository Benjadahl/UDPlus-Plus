
getStorage('lang', function (obj) {
	if (!chrome.runtime.error) {
		var path = window.location.pathname;
		var page = path.split("/").pop();
		console.log(obj.lang)
		if(page == "options.html" && obj.lang == "dansk"){
			window.location.href = "indstillinger.html";
		}

	}
});


getStorage('theme', function (obj) {
	if (!chrome.runtime.error) {
		if (typeof obj.theme != "undefined"){
			$('#theme').val(obj.theme);
		} else {
			$('#theme').val("default");
		}
	}
});

getStorage('homework', function (obj) {
	if (!chrome.runtime.error) {
		if (obj.homework){
			$('#homework').prop("checked", true);
		} else {
			$('#homework').prop("checked", false);
		}
	}
});

getStorage('hideTask', function (obj) {
	if (!chrome.runtime.error) {
		if (obj.hideTask){
			$('#hideTask').prop("checked", true);
		} else {
			$('#hideTask').prop("checked", false);
		}
	}
});

getStorage('sortTaskBy', function (obj) {
	if (!chrome.runtime.error) {
		if (typeof obj.sortTaskBy != "undefined"){
			$('#sortTaskBy').val(obj.sortTaskBy);
		} else {
			$('#sortTaskBy').val(5);
		}
	}
});

$('#theme').on("change", function() {
	setStorage({'theme' : theme.value});
	curtheme = themes[$('#theme').val()];
});

$('#homework').change(function() {
	setStorage({'homework' : $('#homework').prop("checked")});
});

$('#sortTaskBy').on("change", function() {
	setStorage({'sortTaskBy' : $('#sortTaskBy').val()});
});

$('#hideTask').change(function() {
	hideTask = !hideTask;
	setStorage({'hideTask' : $('#hideTask').prop("checked")});
});

$('#hideSidebarCollapse').change(function() {
	hideTask = !hideTask;
	setStorage({'hideSidebarCollapse' : $('#hideSidebarCollapse').prop("checked")});
});
