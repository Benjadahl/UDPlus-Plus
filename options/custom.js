

for(var T in customTemplate){
    $("#frame").append(T + ' : <input type="text" id="' + T + '"></input><br><br>');
}

$("#btnSave").click(function (){
    var obj = {};
    for(var T in customTemplate){
        console.log(T + " = " + $("#" + T).val());
        obj[T] = $("#" + T).val();
    }
    setStorage({"customTheme": {"Julian": obj}});
});