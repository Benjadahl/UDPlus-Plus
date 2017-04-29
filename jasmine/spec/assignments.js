describe("Assignment Page", function() {
	var HideTask;
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

	beforeEach(function(done) {


		//Listen for messages
		chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
			if (msg.action == 'testing' && msg.page == 'assignment') {
				HideTask = msg.hideTask;
				done();
			}
		});
		var creating = chrome.tabs.create({
			url: "https://www.uddataplus.dk/opgave/?id=id_opgave",
			active: false,
		}, function(tab) {
			chrome.tabs.executeScript(tab.id, {code: "setTimeout(function() { hideTasks(true); chrome.runtime.sendMessage({action: 'testing', page: 'assignment', hideTask : $('#gwt-uid-10').is(':checked')} ); window.close();  }, 10000);"});
		});
	});


	
	it("AutoHide", function() {
		expect(HideTask).toBe(false);

	});

});	