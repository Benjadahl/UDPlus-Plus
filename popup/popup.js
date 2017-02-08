getStorage("homework", function (obj) {
  if (!chrome.runtime.error) {
    for (let element of obj.homework){
      $("#homeworkList").append("<li><b>" + element.subject  + ":</b> " + element.note + "</li><br>");
    }
  }
});
