//tests object that all test functions should be added to
var tests = {stringToList: testStringToList()};

//Append all element of tests to the list, and add their result
for (var test in tests){
  $("#testList").append("<li>" + test + ": " + tests[test] + "</li>");
}
