
//We start out by making the textboxes for the different colors to change
for(var T in customTemplate){
    //$("#frame").append(T + ' : <input type="text" id="' + T + '"></input><br><br> ');
    $("#frame").append(T + ' : <input type="color" name="favcolor" id="' + T + '"><br><br> ');
}

//This function is run then the user selects a new theme
function loadTheme(){
    //It starts out by getting the current theme from the textbox un the buttom of the page
    var curTheme = $("#curTheme").val();

    //Then cleans all the textboxes
    for(var T in customTemplate){
        $("#" + T).val("");
    }

    //And then it fills them in with the colors from the current theme
    for(var T in customTheme[curTheme]){
        $("#" + T).val(customTheme[curTheme][T]);
    }

    //And it sets the button textbox to the current theme name for easy saving and deleting
    $("#saveName").val(curTheme);
}

//Loading the clients custom themes
getStorage('customTheme', function (obj) {
	if (!chrome.runtime.error) {
		if (typeof obj.customTheme != "undefined"){
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

    //Making new var for themes so you dont overwrite evertime you change something
    var themeObj = {};

    //Loading the theme name
    var name = $("#saveName").val();

    //Adding the different colors to the theme object
    for(var T in customTemplate){
        themeObj[T] = $("#" + T).val();
    }

    //Copying the custom themes object for editing
    var obj = customTheme;

    //Adds or changes the new custom theme 
    obj[name] = themeObj;
    
    //Saving the whole customtheme object again
    setStorage({"customTheme": obj});

    //Reloading the page to load everything again
    location.reload();
});


//This happends then you click delete
$("#btnDel").click(function (){
    //Making a copy for editing
    var obj = customTheme;

    //Deleting the current theme
    delete obj[$("#saveName").val()];

    //Saving the whole object again.
    setStorage({"customTheme" : obj});

    //Reloading the page to load everything again
    location.reload();
});


//This happens then you select a new theme to edit
$('#curTheme').on("change", function (){
    console.log("Reloading config");
    loadTheme();
    
});