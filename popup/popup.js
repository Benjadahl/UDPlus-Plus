getStorage("homework", function (obj) {
  if (!chrome.runtime.error) {
    for (let element of obj.homework){
      $("#homeworkList").append("<li>" + element + "</li><br>");
    }
  }
});
