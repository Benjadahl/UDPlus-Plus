/*      schedule.js

  THIS IS THE PAGESCRIPT FOR THE SCHEDULE PAGE
*/

//Set the current page variable
curPage = "schedule";

console.log("test" + curtheme);

//On the download links in class notes, set the title attribute to the file name, so we can see the full filename on hover.
function setTitleToDownload() {
	$("a[download]").each(function() {
		$(this).attr("title", $(this).attr("download"));
	});
}
setInterval(setTitleToDownload, 250);

$(document.body).append("<style>.hideLesson { visibility: hidden; }</style>");
