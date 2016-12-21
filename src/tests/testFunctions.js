//This function tests wheter the stringToList() function is working properly
function testStringToList(){
  //Create the array with the function result
  var test = stringToList("Lektier, homework, ,read");
  //Check for the expected results
  if (test[0] === "Lektier" && test[1] === "homework" && test[2] === "read") {
    return true;
  } else {
    return false;
  }
}
