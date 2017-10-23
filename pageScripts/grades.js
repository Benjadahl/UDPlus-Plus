//The string to show by deault in our new table row.
var average_string = "<b>Weighted Average (UD++ estimate)</b>";
var start_bonus = "If you start your higher education before two years have passed from this one, you get to multiply your average by 1.08. This is shown to the right of your genuine average.";

//Just to figure out what language we are printing in. If we're in Danish, we change average_string to a Danish one. Then we call the checkTableIsThere when we're ready to go.
getStorage('lang', function(obj) {
	if (!chrome.runtime.error) {
		if (obj.lang === "dansk") {
			average_string = "<b>Vægtet gennemsnit (UD++ estimeret)</b>";
			start_bonus = "Starter du på din videregående uddannelse indenfor to år, får du startbonus. Det betyder du må gange dit snit med 1.08. Det står til højre for dit rigtige gennemsnit.";
		}
		checkTableIsThere();
	}
});

//This function is pretty cool. It calculates if the table rows are there, and we have figured out the users language yet, and if not, it just calls itself after 100 ms. If it is there, we call addAverage;
function checkTableIsThere() {
	if ($("table > tbody > tr").length < 3) {
		window.setTimeout(checkTableIsThere, 100);
	} else {
		addAverage();
	}
}

//This function adds an extra row to the grades table, which has a weighted average
function addAverage() {

	//This is a rather simple regular expression. It matches a space followed by either an A, B, or C. Then it selects the A, B, or C specifically so we can use that to calculate weight.
	var levelExpression = / ([A,B,C])/;

	//We copy a table row from the page. This way, when they update the CSS selectors, it won't matter. After that, we select the fields on it we want to edit.
	$("table > tbody").append($("table > tbody > tr")[1].outerHTML);
	$("table").after(start_bonus);
	var subject = $("table > tbody >tr:last-child > td:nth-child(1)>div");
	subject.html(average_string);

	var examTimes = $("table > thead > tr:nth-child(1)").children().length-1;

	for (i=0; i< examTimes; i++) {
		var totalGrades = 0.0;
		var aLevels = 0;
		var totalWeight = 0.0;

		$("table > tbody > tr").each(function() {
			//For each subject
			var curElement = $(this);
			var curSubject = $(curElement.children()[0]).text();
			var level = curSubject.match(levelExpression);

			var latestGradeTime = i;
			var grade = null;
			var examGrade = null;

			while (grade === null && examGrade === null && latestGradeTime <= examTimes) {
				//Lastest grade element
				var lge = $(curElement.children()[latestGradeTime*2+1]);
				//Lastest exam grade element
				var lege = $(curElement.children()[latestGradeTime*2+2]);


				try {
					if (!isNaN(lge.text())) grade = parseInt(lge.text());
				} catch (e) {

				}
				try {
					if (!isNaN(lege.text())) examGrade = parseInt(lege.text());
				} catch (e) {

				}
				latestGradeTime++;
			}

			if (isNaN(grade)) grade = null;
			if (isNaN(examGrade)) examGrade = null;


			if (grade !== null || examGrade !== null) {
				if (level !== null) {

					//We have to initalize the variable, or it just gets weird.
					var weight = 0;

					//level[1] is the part matched by the ()'s. Now we have a switch case to calculate the weights.
					switch(level[1]) {
						case "A":
							weight = 2;
							aLevels++;
						break;
						case "B":
							weight = 1.5;
						break;
						case "C":
							weight = 1;
					}

					totalWeight += weight;
					if (grade !== null && examGrade !== null) weight = weight/2;

					if (typeof grade === 'number') totalGrades += grade * weight;
					if (typeof examGrade === 'number') totalGrades += examGrade * weight;

					//And now we do some math and add it to the running total.
				}
			}
		});
		var average = totalGrades / totalWeight;
		if (aLevels === 4) {
			average = average * 1.04;
		} else if (aLevels > 4) {
			average = average * 1.06;
		}
		var bonAverage = average * 1.08;
		bonAverage = Math.round(10*bonAverage)/10;
		average = Math.round(10*average) / 10;
		var grade = $("table > tbody >tr:last-child > td:nth-child(" + (2+2*i) + ") > div");
		var bonGrade = $("table > tbody >tr:last-child > td:nth-child(" + (3+2*i) + ") > div");
		if (average < 15 && average > -3) {
			debugLog(totalGrades);
			bonGrade.html("<b>" + bonAverage + "</b>");
			grade.html("<b>" + average + "</b>");
		} else {
			grade.html("");
		}
	}
}
