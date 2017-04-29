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
		expect(getWeekNumber(new Date(Date.UTC(2016, 11, 12, 5, 5, 5)))).toBe(50);
	});

	it("Leading zeroes test", function() {
		expect(leadingZeroes("05")).toBe("05");
		expect(leadingZeroes("5")).toBe("05");
	});

	it("Short ISO date", function() {
		expect(ToShortISODate("2017-04-22")).toBe("2017-04-22");
		expect(ToShortISODate("2016-02-17")).toBe("2016-02-17");
	});

	it("arraysSame", function() {
		expect(arraysSame([], [])).toBe(true);
		expect(arraysSame(["a"], [])).toBe(false);
		expect(arraysSame(["a"], ["b"])).toBe(false);
	});

	it("Contains", function() {
		expect(contains(["a", "b", "c"], "c")).toBe(true);
	});


	it("Fix UDDATA dates", function() {
		expect(UDDateToDate("2017-01-23T08:15:00").getMonth()).toBe(0);
		expect(UDDateToDate("2017-01-23T08:15:00").getUTCHours()).toBe(7);
		expect(UDDateToDate("2017-05-23T08:15:00").getUTCHours()).toBe(6);
	});

	it("Get danish timezone", function() {
		expect(getDanishTimezone(new Date("2017-04-20"))).toBe(2);
		expect(getDanishTimezone(new Date("2017-03-15"))).toBe(1);
		expect(getDanishTimezone(new Date("1984-03-15"))).toBe(1);
	});
});
