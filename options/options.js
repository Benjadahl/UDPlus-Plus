setStorage({'showNews' : false});

getStorage('lang', function (obj) {
	if (!chrome.runtime.error) {
		var path = window.location.pathname;
		var page = path.split("/").pop();
		if(page == "options.html" && obj.lang == "dansk"){
			window.location.href = "indstillinger.html";
		}
	}
});

getStorage('customTheme', function (obj) {
	if (!chrome.runtime.error) {
		if(typeof obj.customTheme != "undefined"){
			//Adding dropdown seperator
			if(!jQuery.isEmptyObject(obj.customTheme)){
				themeSelect.append("<option disabled>&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;</option>");
			}
			for(var T in obj.customTheme){
				themeSelect.append($('<option>', {
					value: T,
					text: T
				}));
			}
		}
	}
});

//Dynamically add themes from themes file
var themeSelect = $("#theme");
for (var key in themes) {
	if (true) {
		themeSelect.append($('<option>', {
			value: key,
			text: themes[key].name
		}));
	}
}

getStorage('theme', function (obj) {
	if (!chrome.runtime.error) {
		if (typeof obj.theme != "undefined"){
			$('#theme').val(obj.theme);
		} else {
			$('#theme').val("default");
			setStorage({'theme' : "default"});
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

getStorage({homeworkWords: "lektie,forbered"}, function (obj) {
	if (!chrome.runtime.error) {
		$('#homeworkWords').val(obj.homeworkWords);
	}
});

getStorage({toHide: ""}, function (obj) {
	if (!chrome.runtime.error) {
		$('#lessonWords').val(obj.toHide);
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
			$('#sortTaskBy').val(3);
		}
	}
});

if (new Date().getMonth() === 11) {
	getStorage('snowState', function(obj) {
		if (!chrome.runtime.error) {
			if (obj.snowState[0]) {
				$("#SnowOn").prop("checked", true);
			} else {
				$("#SnowOn").prop("checked", false);
			}
			if (obj.snowState[1]) {
				$("#xmashat").prop("checked", true);
			} else {
				$("#xmashat").prop("checked", false);
			}
		}
	});
	$('#SnowOn').on("change", function() {
		setStorage({'snowState' : [$('#SnowOn').prop("checked"), $('#xmashat').prop("checked")]})
	});
	$('#xmashat').on("change", function() {
		setStorage({'snowState' : [$('#SnowOn').prop("checked"), $('#xmashat').prop("checked")]})
	});
} else {
	$(".SnowOn").remove();
	$(".xmashat").remove();
}


$('#theme').on("change", function() {
	setStorage({'theme' : theme.value});
	curtheme = themes[$('#theme').val()];
});

$('#homework').change(function() {
	setStorage({'homework' : $('#homework').prop("checked")});
});

$('#homeworkWords').change(function() {
	setStorage({'homeworkWords' : $('#homeworkWords').val()});
});

$('#lessonWords').change(function() {
	setStorage({'toHide' : $('#lessonWords').val()});
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

