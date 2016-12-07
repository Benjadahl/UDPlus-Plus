window.setTimeout(function() {
	var totalGrades = 0;
	var totalWeight = 0.0;

	var levelExpression = / ([A,B,C])/;

	$("table > tbody > tr").each(function() {
		var calcSubject = $(this).find("td:nth-child(1) > div").html();
		var calcGrade = $(this).find("td:nth-child(2) > div").html();


		var level = calcSubject.match(levelExpression);

		if (level !== null) {

			var weight = 0;

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
			totalGrades += parseInt(calcGrade) * weight;
			totalWeight += weight;
		}
	});

	//We copy a table row from the page. This way, when they update the CSS selectors, it won't matter.
	$("table > tbody").append($("table > tbody > tr")[1].outerHTML);
	var subject = $("table > tbody >tr:last-child > td:nth-child(1)>div");
	var grade = $("table > tbody >tr:last-child > td:nth-child(2)>div");

	subject.html("Average");
	var average = Math.round(((totalGrades / totalWeight)*10)) / 10;
	grade.html(average);
}, 2000);
