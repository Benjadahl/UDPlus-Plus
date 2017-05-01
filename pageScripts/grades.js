//The string to show by deault in our new table row.
var average_string = "<b>Weighted Average (UD++ estimate)</b>";

//Just to figure out what language we are printing in. If we're in Danish, we change average_string to a Danish one. Then we call the checkTableIsThere when we're ready to go.
getStorage('lang', function(obj) {
	if (!chrome.runtime.error) {
		if (obj.lang === "dansk") average_string = "<b>Vægtet gennemsnit (UD++ estimeret)</b>";
		checkTableIsThere();
	}
});

//This function is pretty cool. It calculates if the table rows are there, and we have figured out the users language yet, and if not, it just calls itself after 100 ms. If it is there, we call addAverage;
function checkTableIsThere() {
	if ($("table > tbody > tr").length < 1) {
		window.setTimeout(checkTableIsThere, 100);
	} else {
		addAverage();
	}
}

//This function adds an extra row to the grades table, which has a weighted average
function addAverage() {

	var rows = $("table > thead > tr:nth-child(2) > th").length - 1;

	//This is a rather simple regular expression. It matches a space followed by either an A, B, or C. Then it selects the A, B, or C specifically so we can use that to calculate weight.
	var levelExpression = / ([A,B,C])/;

	//We copy a table row from the page. This way, when they update the CSS selectors, it won't matter. After that, we select the fields on it we want to edit.
	$("table > tbody").append($("table > tbody > tr")[1].outerHTML);
	var subject = $("table > tbody >tr:last-child > td:nth-child(1)>div");

	for (i = 1; i <= rows; i++) {
		//To keep a running total
		var totalGrades = 0;
		var totalWeight = 0.0;


		$("table > tbody > tr > td:nth-child(" + (i+1) + ")").each(function() {

			//The subject we got. This is a raw text string such as "Dansk A, mundtlig"
			var calcSubject = $(this).parent().find("td:nth-child(1) > div").html();
			//The grade. This is just a number formatted as a string, such as "7"
			var calcGrade = parseInt($(this).find("div").html());

			if (!isNaN(calcGrade)) {

				//We now execute the regex to get a matching object
				var level = calcSubject.match(levelExpression);

				//If we match, we continue onwards. There is a really weird table row that doesn't match, so this is a nice way to not have it crash everything.
				if (level !== null) {

					//We have to initalize the variable, or it just gets weird.
					var weight = 0;

					//level[1] is the part matched by the ()'s. Now we have a switch case to calculate the weights.
					switch(level[1]) {
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
					totalGrades += calcGrade * weight;
					totalWeight += weight;
				}
			}
		});

		var grade = $("table > tbody >tr:last-child > td:nth-child(" + (i+1) + ") > div");
		debugLog(totalGrades);
		debugLog(totalWeight);
		//The reason we have this weird rounding is so we can round it to one decimal by multiplying the number to ten, rounding it to an integer, and dividing by ten again.
		var average = Math.round(10*totalGrades / totalWeight) / 10;

		if (average < 15 && average > -3) {
			debugLog(totalGrades);
			grade.html("<b>" + average + "</b>");
		} else {
			grade.html("");
		}


	}



	subject.html(average_string);
}
