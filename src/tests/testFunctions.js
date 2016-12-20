function testStringToList(){
  var test = stringToList("Lektier, homework, ,read");
  if(test[0] === "Lektier" && test[1] === "homework" && test[2] === "read"){
    return true;
  }
}
