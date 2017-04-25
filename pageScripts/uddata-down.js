var dashboardURL = chrome.runtime.getURL('dashboard/dashboard.html');

window.onload = function() {
	$("body").append("<button id='dashboardLoad'><h1>UD++ Dashboard</h1></button>");
	$('#dashboardLoad').click(function() {
		chrome.runtime.sendMessage({action: 'openDashboard'});
	});
}
