var dashboardURL = chrome.runtime.getURL('dashboard/dashboard.html');

window.onload = function() {
	$("body").append("<a href=\"" + dashboardURL + "\"><h1>UD++ Dashboard</h1></a>");
}
