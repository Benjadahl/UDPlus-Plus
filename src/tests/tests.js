var tests = {stringToList: testStringToList()};


for (var test in tests){
  $("#testList").append("<li>" + test + ": " + tests[test] + "</li>");
}
