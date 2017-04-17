describe("Grades PageScript", function() {
	var GradeDOM;
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

	beforeEach(function(done) {
		//Listen for messages
		chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
			if (msg.action == 'testing' && msg.page == 'grades') {
				GradeDOM = msg.sendDOM;
				done();
			}
		});
		var creating = chrome.tabs.create({
			url: "https://www.uddataplus.dk/bevis/?id=id_karakterervis",
			active: false,
		}, function(tab) {
			chrome.tabs.executeScript(tab.id, {code: "setTimeout(function() { chrome.runtime.sendMessage({action: 'testing', page: 'grades', sendDOM: document.all[0].outerHTML}); window.close(); }, 10000);"});
		});
	});

	it("Grade averages appended to table", function() {
		var lastTR = $(GradeDOM).find("tr");
		lastTR = $(lastTR[lastTR.length - 1]).html();
		//Matches things insides <b> tags
		var testregex = new RegExp(/<b[^>]*>([^<]*)<\/b>/g);
		var matches = lastTR.match(testregex);
		console.log(matches);
		matches.forEach(function(thing, index) {
			if (index == 0) expect(thing).toMatch(/(<b>Weighted Average \(UD\+\+ estimate\)<\/b>|<b>Vægtet gennemsnit \(UD\+\+ estimeret\)<\/b>)/);
			if (index != 0 && index != matches.length-1) expect(thing).toMatch(/<b>\d\d?\.\d<\/b>/);
		})
	});
});
