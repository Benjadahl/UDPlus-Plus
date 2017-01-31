
//Lang support
getStorage('lang', function (obj) {
	if (!chrome.runtime.error) {
		var path = window.location.pathname;
		var page = path.split("/").pop();
		if(page == "custom.html" && obj.lang == "dansk"){
			window.location.href = "egetTema.html";
		}
	}
});

//We start out by making the textboxes for the different colors to change
for(var T in customTemplate){
	if(T != "Lesson_Transparent" && T != "Navigationbar_image" && T != "BackgroundImg_BETA"){
		$("#frame").append(T + ' : <input type="text" class="jscolor {required:false, hash:true}" id="' + T + '"></input><br><br>');
	}else if( T == "Navigationbar_image" || T == "BackgroundImg_BETA"){
		$("#frame").append(T + ' : <input type="text" id="' + T + '"></input><br><br>');

	}else{
		$("#frame").append(T + ' | Fra 0 til 1 : <input type="range" min="0" max="1" step="0.05" id="' + T + '" value="0.75"></input><br><br>');
	}
}

//This function is run then the user selects a new theme
function loadTheme(){
	//It starts out by getting the current theme from the textbox un the buttom of the page
	var curTheme = $("#curTheme").val();

	//Then cleans all the textboxes
	for(var T in customTemplate){
		$("#" + T).val("");
		$("#" + T).css("background-color", "#FFFFFF");
	}

	//And then it fills them in with the colors from the current theme

	if(typeof themes[curTheme] != "undefined"){
		for(var T in themeConvert){
			$("#" + themeConvert[T]).val(themes[curTheme][T]);
			$("#" + themeConvert[T]).css("background-color", themes[curTheme][T]);
		}
	}else{
		for(var T in customTheme[curTheme]){
			$("#" + T).val(customTheme[curTheme][T]);
			$("#" + T).css("background-color", customTheme[curTheme][T]);
		}
	}

	//And it sets the button textbox to the current theme name for easy saving and deleting
	$("#saveName").val(curTheme);
}


//Adding default themes
for (var key in themes) {
	if (true) {
		$("#curTheme").append($('<option>', {
			value: key,
			text: themes[key].name
		}));
	}
}
//Loading the clients custom themes
getStorage('customTheme', function (obj) {
	if (!chrome.runtime.error) {
		if (typeof obj.customTheme != "undefined"){



			//Adding dropdown seperator
			if(!jQuery.isEmptyObject(obj.customTheme)){
				$("#curTheme").append("<option disabled>&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;</option>");
			}
			//Adding clients themes to the dropdown
			for(var T in obj.customTheme){
				$("#curTheme").append('<option value="' + T +'">' + T + '</option>');
			}

			//Setting the customTheme object
			customTheme = obj.customTheme;

			//Setting the current theme to nothing for a fresh start
			$("#curTheme").val("");

		}
	}
});


//This happens then you click save
$("#btnSave").click(function (){

	if(typeof themes[$("#saveName").val()] == "undefined" && $("#saveName").val() != ""){
		//Making new var for themes so you dont overwrite evertime you change something
		var themeObj = {};

		//Loading the theme name
		var name = $("#saveName").val();

		//Adding the different colors to the theme object
		for(var T in customTemplate){
			if($("#" + T).val() != ""){
				themeObj[T] = $("#" + T).val();
				console.log("#" + T + "   " + $("#" + T).val())
			}else{
				delete themeObj[T];
			}

		}

		//Copying the custom themes object for editing
		var obj = customTheme;

		//Adds or changes the new custom theme
		obj[name] = themeObj;

		//Saving the whole customtheme object again
		setStorage({"customTheme": obj});

		//Reloading the page to load everything again
		location.reload();
	}else{
		$("#error").show();
		$("#errorNoTheme").hide();
	}

});

$("#btnExport").click(function() {

	if(typeof themes[$("#saveName").val()] == "undefined" && $("#saveName").val() != ""){
		//Making new var for themes so you dont overwrite evertime you change something
		console.log("Clicked");
		var themeObj = {};

		//Loading the theme name
		var name = $("#saveName").val();

		//Adding the different colors to the theme object
		for(var T in customTemplate){
			if($("#" + T).val() != ""){
				themeObj[T] = $("#" + T).val();
				console.log("#" + T + "   " + $("#" + T).val())
			}else{
				delete themeObj[T];
			}

		}

		//Copying the custom themes object for editing
		var obj = customTheme;

		//Adds or changes the new custom theme
		obj[name] = themeObj;

		console.log(obj);
		console.log(JSON.stringify(obj));
		$("#textIO").val(JSON.stringify(obj));

	}else{
		$("#error").show();
		$("#errorNoTheme").hide();
	}

});

$("#btnImport").click(function() {

	try {
		var obj = JSON.parse($("#textIO").val()); // this is how you parse a string into JSON

		var firstProp;
		for(var key in obj) {
			if(obj.hasOwnProperty(key)) {
				firstProp = key;
				break;
			}
		}

		console.log(obj);
		var curTheme = firstProp;
		console.log("Importing " + curTheme);

		//Then cleans all the textboxes
		for(var T in customTemplate){
			$("#" + T).val("");
			$("#" + T).css("background-color", "#FFFFFF");
		}

		//And then it fills them in with the colors from the current theme

		if(typeof obj[curTheme] != "undefined"){
			for(var T in themeConvert){
				$("#" + themeConvert[T]).val(obj[curTheme][themeConvert[T]]);
				$("#" + themeConvert[T]).css("background-color", obj[curTheme][themeConvert[T]]);
			}
		}

		//And it sets the button textbox to the current theme name for easy saving and deleting
		$("#saveName").val(curTheme);




	} catch (ex) {
		console.error(ex);
	}

});


//This happends then you click delete
$("#btnDel").click(function (){


	//Making a copy for editing
	var obj = customTheme;

	if(typeof obj[$("#saveName").val()] != "undefined"){

		//Deleting the current theme
		delete obj[$("#saveName").val()];

		//Saving the whole object again.
		setStorage({"customTheme" : obj});
		//Reloading the page to load everything again
		location.reload();
	}else{
		$("#errorNoTheme").show();
		$("#error").hide();
	}


});


//This happens then you select a new theme to edit
$('#curTheme').on("change", function (){
	loadTheme();

});
