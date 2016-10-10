

for(var T in customTemplate){
    $("#frame").append(T + ' : <input type="text" id="' + T + '"></input><br><br>');
}

function loadTheme(){
    var curTheme = $("#curTheme").val();
    console.log(curTheme);
    for(var T in customTemplate){
        $("#" + T).val("");
    }
    for(var T in customTheme[curTheme]){
        $("#" + T).val(customTheme[curTheme][T]);
        console.log(T);
    }
    $("#saveName").val(curTheme);
}

getStorage('customTheme', function (obj) {
	if (!chrome.runtime.error) {
        console.log(obj.customTheme);
		if (typeof obj.customTheme != "undefined"){
            for(var T in obj.customTheme){
                $("#curTheme").append('<option value="' + T +'">' + T + '</option>');
                customTheme = obj.customTheme;
            }
            loadTheme();
            //$("#curTheme").val("");
		}
	}
});

$("#btnSave").click(function (){
    var themeObj = {};
    var name = $("#saveName").val();
    for(var T in customTemplate){
        console.log(T + " = " + $("#" + T).val());
        themeObj[T] = $("#" + T).val();
    }
    var obj = customTheme;
    obj[name] = themeObj;
    console.log(obj);
    setStorage({"customTheme": obj});
    location.reload();
});

$("#btnDel").click(function (){
    var obj = customTheme;
    delete obj[$("#saveName").val()];
    setStorage({"customTheme" : obj});
    location.reload();
});



$('#curTheme').on("change", function (){
    console.log("Test");
    loadTheme();
    
});