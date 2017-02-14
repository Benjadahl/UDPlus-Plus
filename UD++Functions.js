function stringToList(string) {
	var thelist = string.split(",");
	for (var i=0; i<thelist.length; i++) {
		thelist[i] = thelist[i].replace(/\s/g, "");
		if (thelist[i] == "") thelist.splice(i,1);
	}
	if (thelist === [""]) thelist.splice(0,1);
	return thelist;
}

function fixTimezone(date) {
	return date;
	var timeZoneOffset = new Date().getTimezoneOffset() / 60;
	date.setHours(date.getHours() + timeZoneOffset);
	return new Date(date);
}

function ToShortISODate(date) {
	return new Date(date).toISOString().split("T")[0];
}

/* This function is how we get the schedule from UDDATA's RESTful API. The dates are in ISO 8601, so it's YYY-MM-DD
 * The callback is a function which takes the output and does whatever.
 */
function getSchedule(startDate, endDate, callback) {
	$.ajax({
		url: "https://www.uddataplus.dk/services/rest/skema/hentEgnePersSkemaData?startdato=" + startDate + "&slutdato=" + endDate
	}).then(function(data) {
		console.log(data);
		var scheduleReturn = {};
		for (dayKey in data["begivenhedMap"]) {
			var day = data["begivenhedMap"][dayKey];
			var returnDay = {};
			for (classKey in day) {
				var returnClass = {};
				var theClass = day[classKey];
				var skemabeg_id = theClass["skemabeg_id"];

				//The class name
				returnClass["Name"] = theClass["kortBetegnelse"];

				//Start and end times
				returnClass["Start"] = fixTimezone(new Date(theClass["start"]));
				returnClass["End"] = fixTimezone(new Date(theClass["slut"]));

				//Niveau, as in A, B, and C.
				returnClass["Level"] = theClass["niveau"];

				//Location
				returnClass["Rooms"] = {};
				for (room in theClass["lokaleList"]) {
					returnClass["Rooms"][room] = theClass["lokaleList"][room]["lokalenr"];
				}



				//Teachers
				returnClass["Teachers"] = {};
				for (worker in theClass["medarbejderList"]) {
					returnClass["Teachers"][worker] = theClass["medarbejderList"][worker]["initialer"];
				}

				//The note
				if (typeof data["note2Map"][skemabeg_id] !== "undefined") {
					returnClass["Note"] = data["note2Map"][skemabeg_id]["tekst"];
				}

				returnDay[classKey] = returnClass;


			}
			scheduleReturn[ToShortISODate(dayKey)] = returnDay;
		}
		callback(scheduleReturn);
	});
}
