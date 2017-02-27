describe("UD++functions", function() {
	it("Test of stringToList", function() {
		input = ["Hello, Hej", " ", "Studiecafé", "                ", "Dansk, Engelsk, Kemi"];
		output = [["Hello", "Hej"], [], ["Studiecafé"], [], ["Dansk", "Engelsk", "Kemi"]];
		for (i=0; i < input.length; i++) {
			expect(stringToList(input[i]).toString()).toBe(output[i].toString());
		}
	});

	it("Week number test", function() {
		expect(new Date("2017-02-26").getWeekNumber()).toBe(8);
		expect(new Date("2017-02-27").getWeekNumber()).toBe(9);
		expect(new Date("2016-12-12").getWeekNumber()).toBe(50);
	});
});
