





setStorage({'showNews' : false});

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


//New optionLoader
getStorage("options", function (object) {
	if(!chrome.runtime.error){

		var obj = object.options;

		console.log(obj);
		
		//Lang option
		if(typeof obj.lang !== "undefined") {
			var path = window.location.pathname;
			var page = path.split("/").pop();
			if(page == "options.html" && obj.lang == "dansk"){
				window.location.href = "indstillinger.html";
			}
		}

		//CustomThemes
		if(typeof obj.customTheme !== "undefined") {
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

		//Current theme option
		if (typeof obj.theme != "undefined"){
			$('#theme').val(obj.theme);
		} else {
			$('#theme').val("default");
			setStorage({'theme' : "default"});
		}

		
		//Homework setting
		if (obj.homework){
			$('#homework').prop("checked", true);
		} else {
			$('#homework').prop("checked", false);
		}

		//hideSideBarCollapse setting
		if (obj.hideSidebarCollapse){
			$('#hideSidebarCollapse').prop("checked", true);
		} else {
			$('#hideSidebarCollapse').prop("checked", false);
		}

		$('#homeworkWords').val(obj.homeworkWords);

		//Hide task
		if (obj.hideTask){
			$('#hideTask').prop("checked", true);
		} else {
			$('#hideTask').prop("checked", false);
		}

		//Task sorting
		if (typeof obj.sortTaskBy != "undefined"){
			$('#sortTaskBy').val(obj.sortTaskBy);
		} else {
			$('#sortTaskBy').val(3);
		}

		//Xmas settings
		if(new Date().getMonth() === 11){
			if(typeof obj.snowState !== "undefined"){
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
			$('#SnowOn').on("change", function() {
				saveElement("options", "snowState", [$('#SnowOn').prop("checked"), $('#xmashat').prop("checked")]);
			});
			$('#xmashat').on("change", function() {
				setStorage({'snowState' : [$('#SnowOn').prop("checked"), $('#xmashat').prop("checked")]})
			});
		} else {
			$(".SnowOn").remove();
			$(".xmashat").remove();
		}


		//
		
	}
});

//Old options i dont know how to convert
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







$('#theme').on("change", function() {
	saveElement("options", "theme", theme.value);
	curtheme = themes[$('#theme').val()];
});

$('#homework').change(function() {
	saveElement("options", "homework", $("#homework").prop("checked"));
});

$('#homeworkWords').change(function() {
	setStorage({'homeworkWords' : $('#homeworkWords').val()});
});

$('#lessonWords').change(function() {
	setStorage({'toHide' : $('#lessonWords').val()});
});

$('#sortTaskBy').on("change", function() {
	saveElement("options", "sortTaskBy", $('#sortTaskBy').val());
});

$('#hideTask').change(function() {
	hideTask = !hideTask;
	saveElement("options", "hideTask", $('#hideTask').prop("checked"));
});

$('#hideSidebarCollapse').change(function() {
	hideTask = !hideTask;
	saveElement("options", "hideSidebarCollapse", $('#hideSidebarCollapse').prop("checked"));
});

