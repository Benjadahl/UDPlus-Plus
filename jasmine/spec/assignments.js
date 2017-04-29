describe("Assignment Page", function() {
	var HideTask;
	var sortBy;
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

	beforeAll(function(done) {


		//Listen for messages
		chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
			if (msg.action == 'testing' && msg.page == 'assignment') {
				HideTask = msg.hideTask;
				sortBy = msg.sortBy;
				done();
			}
		});
		var creating = chrome.tabs.create({
			url: "https://www.uddataplus.dk/opgave/?id=id_opgave",
			active: false,
		}, function(tab) {
			chrome.tabs.executeScript(tab.id, {code: "setTimeout(function(){sortTasks(2);}, 5000); setTimeout(function() { hideTasks(true); chrome.runtime.sendMessage({action: 'testing', page: 'assignment', hideTask : $('#gwt-uid-10').is(':checked'), sortBy : $('thead > tr').children().eq(2).hasClass('sorting_asc')} ); window.close(); }, 10000);"});
		});
	});


	
	it("AutoHide", function() {
		expect(HideTask).toBe(false);

	});

	it("AutoSort", function() {
		expect(sortBy).toBe(true);

	});

});	