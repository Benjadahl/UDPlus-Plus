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

getStorage('homeworkBadge', function (obj) {
	if (!chrome.runtime.error) {
		if (obj.homeworkBadge){
			$('#homeworkBadge').prop("checked", true);
		} else {
			$('#homeworkBadge').prop("checked", false);
		}
	}
});

getStorage("TooEarly", function (obj) {
	if (!chrome.runtime.error) {
		if (typeof obj.TooEarly !== 'undefined')
			$('#TooEarly').val(obj.TooEarly);
	}
});

function getOptions() {
	getStorage("cacheFiles", function (obj) {
		if (!chrome.runtime.error) {
			if (typeof obj.cacheFiles !== 'undefined')
				$('#cacheFiles').prop("checked", obj.cacheFiles);
		}
	});
}
getOptions();


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


function saveSetting(){
	$("#saved").show();
}


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
		saveSetting();
	});
	$('#xmashat').on("change", function() {
		setStorage({'snowState' : [$('#SnowOn').prop("checked"), $('#xmashat').prop("checked")]})
		saveSetting();
	});
} else {
	$(".SnowOn").remove();
	$(".xmashat").remove();
}


$('#theme').on("change", function() {
	setStorage({'theme' : theme.value});
	curtheme = themes[$('#theme').val()];
	saveSetting();
});

$('#homework').change(function() {
	setStorage({'homework' : $('#homework').prop("checked")});
	saveSetting();
});

$('#homeworkBadge').change(function() {
	setStorage({'homeworkBadge' : $('#homeworkBadge').prop("checked")});
	chrome.runtime.sendMessage({action: 'updateTicker'});
	saveSetting();
});


$('#cacheFiles').change(function() {
	setStorage({'cacheFiles' : $('#cacheFiles').prop("checked")});
	saveSetting();
});

$('#TooEarly').change(function() {
	setStorage({'TooEarly' : $('#TooEarly').val()});
	saveSetting();
});

$('#homeworkWords').change(function() {
	setStorage({'homeworkWords' : $('#homeworkWords').val()});
	saveSetting();
});

$('#lessonWords').change(function() {
	setStorage({'toHide' : $('#lessonWords').val()});
	saveSetting();
});

$('#sortTaskBy').on("change", function() {
	setStorage({'sortTaskBy' : $('#sortTaskBy').val()});
	saveSetting();
});

$('#hideTask').change(function() {
	hideTask = !hideTask;
	setStorage({'hideTask' : $('#hideTask').prop("checked")});
	saveSetting();
});

getStorage('hideSidebarCollapse', function(obj) {
	if (obj.hideSidebarCollapse) $("#hideSidebarCollapse").prop('checked', true);
})

$('#hideSidebarCollapse').change(function() {
	hideTask = !hideTask;
	setStorage({'hideSidebarCollapse' : $('#hideSidebarCollapse').prop("checked")});
	saveSetting();
});


//Set the used storage

//Make i more human friendly. Found here http://stackoverflow.com/questions/35623493/how-to-convert-kilobytes-to-megabytes-in-javascript
function formatSizeUnits(bytes){
	if      (bytes>=1073741824) {bytes=(bytes/1073741824).toFixed(2)+' GiB';}
	else if (bytes>=1048576)    {bytes=(bytes/1048576).toFixed(2)+' MiB';}
	else if (bytes>=1024)       {bytes=(bytes/1024).toFixed(2)+' KiB';}
	else if (bytes>1)           {bytes=bytes+' bytes';}
	else if (bytes==1)          {bytes=bytes+' byte';}
	else                        {bytes='0 bytes';}
	return bytes;
}

$("#usedStorage").text("Calculating size...");

chrome.runtime.sendMessage({action: "requestCacheSize"});

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  if(message.action === "cacheSize"){
    if(message.error) {
      $("#usedStorage").text("An error occurred: " + message.error.message);
    } else {
      $("#usedStorage").text(formatSizeUnits(message.cacheSize));
    }
  }
});

function setDevVisible(vis) {
	if (vis) {
		$("#devOptions").css("visibility", "visible");
	} else {
		$("#devOptions").css("visibility", "hidden");
	}
}

getStorage('devMode', function(obj) {
	if (!chrome.runtime.error) setDevVisible(obj.devMode);
});

//Codes
var konamiCode = [38,38,40,40,37,39,37,39,66,65]; // Up Up Down Down Left Right Left Right b a
var konamiPos = 0;
document.addEventListener('keydown', function(e) {
	if (e.keyCode == konamiCode[konamiPos]) {
		konamiPos++;
		if (konamiPos == konamiCode.length) {
			getStorage('devMode', function (obj) {
				if (!chrome.runtime.error) {
					setStorage({'devMode' : !obj.devMode});
					setDevVisible(!obj.devMode);
				}
			});
			konamiPos = 0;
		}
	} else {
		konamiPos = 0;
	}
});

$("#openUnitTest").attr("href", chrome.runtime.getURL('jasmine/SpecRunner.html'));



$("#del").click(function() {
	chrome.runtime.sendMessage({action: "deleteFilesystem"});
	location.reload();
});

chrome.storage.onChanged.addListener(function () {
	loadOptions();
});
