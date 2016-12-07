//This function is pretty cool. It calculates if the table rows are there, and if not, it just calls itself after 100 ms. If it is there, we call addAverage;
function checkTableIsThere() {
	if ($("table > tbody > tr").length < 1) {
		window.setTimeout(checkTableIsThere, 100);
	} else {
		addAverage();
	}
}

function addAverage() {

	//To keep a running total
	var totalGrades = 0;
	var totalWeight = 0.0;

	//This is a rather simple regular expression. It matches a space followed by either an A, B, or C. Then it selects the A, B, or C specifically so we can use that to calculate weight.
	var levelExpression = / ([A,B,C])/;

	$("table > tbody > tr").each(function() {
		//The subject we got. This is a raw text string such as "Dansk A, mundtlig"
		var calcSubject = $(this).find("td:nth-child(1) > div").html();
		//The grade. This is just a number formatted as a string, such as "7"
		var calcGrade = $(this).find("td:nth-child(2) > div").html();

		//We now execute the regex to get a matching object
		var level = calcSubject.match(levelExpression);

		//If we match, we continue onwards. There is a really weird table row that doesn't match, so this is a nice way to not have it crash everything.
		if (level !== null) {

			//We have to initalize the variable, or it just gets weird.
			var weight = 0;

			//level[1] is the part matched by the ()'s. Now we have a switch case to calculate the weights.
			level = level[1];
			switch(level) {
				case "A":
					weight = 2;
				break;
				case "B":
					weight = 1.5;
				break;
				case "C":
					weight = 1;
			}

			//And now we do some math and add it to the running total.
			totalGrades += parseInt(calcGrade) * weight;
			totalWeight += weight;
		}
	});

	//We copy a table row from the page. This way, when they update the CSS selectors, it won't matter. After that, we select the fields on it we want to edit.
	$("table > tbody").append($("table > tbody > tr")[1].outerHTML);
	var subject = $("table > tbody >tr:last-child > td:nth-child(1)>div");
	var grade = $("table > tbody >tr:last-child > td:nth-child(2)>div");

	subject.html("<b>Weighted Average</b>");
	//The reason we have this weird rounding is so we can round it to one decimal by multiplying the number to ten, rounding it to an integer, and dividing by ten again.
	var average = Math.round(10*totalGrades / totalWeight) / 10;
	grade.html("<b>" + average + "</b>");
}
checkTableIsThere();
