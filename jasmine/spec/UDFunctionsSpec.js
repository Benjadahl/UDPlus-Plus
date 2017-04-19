describe("UD++functions", function() {
	it("Test of stringToList", function() {
		input = ["Hello, Hej", " ", "Studiecafé", "                ", "Dansk, Engelsk, Kemi"];
		output = [["Hello", "Hej"], [], ["Studiecafé"], [], ["Dansk", "Engelsk", "Kemi"]];
		for (i=0; i < input.length; i++) {
			expect(stringToList(input[i]).toString()).toBe(output[i].toString());
		}
	});

	it("Week number test", function() {
		//expect(new Date("2017-02-26").getWeekNumber()).toBe(8);
		//expect(new Date("2017-02-27").getWeekNumber()).toBe(9);
		expect(getWeekNumber(new Date("2016-02-26"))).toBe(8);
		expect(getWeekNumber(new Date("2016-02-17"))).toBe(7);
		expect(getWeekNumber(new Date("2016-12-12"))).toBe(50);
	});

	it("Leading zeroes test", function() {
		expect(leadingZeroes("05")).toBe("05");
		expect(leadingZeroes("5")).toBe("05");
	});

	it("Short ISO date", function() {
		expect(ToShortISODate("2017-04-22")).toBe("2017-04-22");
		expect(ToShortISODate("2016-02-17")).toBe("2016-02-17");
	});

	it("Fix timezone", function() {
		expect(fixTimezone(new Date("2017-01-23T08:15:00")).toString()).toBe(new Date(2017, 0, 23, 09, 15).toString());
		expect(fixTimezone(new Date("2017-04-10T16:00:00")).toString()).toBe(new Date(2017, 03, 10, 18).toString());
	})
});
