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

function cacheScheduleFetch(startDate, endDate, schedule) {
	getStorage({'scheduleCaches': {}}, true, function(obj) {
		if (!chrome.runtime.error) {
			var scheduleCaches = {};
			Object.assign(scheduleCaches, obj.scheduleCaches);
			for (day in schedule) {
				scheduleCaches[day] = JSON.stringify(schedule[day]);
			}
			setStorage({"scheduleCaches": scheduleCaches}, true);
		}
	});
}

function leadingZeroes(x, digits=2) {
	x = "0" + x;
	x = x.slice(-digits);
	return x;
}

/* This function is how we get the schedule from UDDATA's RESTful API. The dates are in ISO 8601, so it's YYY-MM-DD
 * The callback is a function which takes the output and does whatever.
 */
function getSchedule(startDate, endDate, callback) {
	var message = '';
	$.ajax({
		url: "https://www.uddataplus.dk/services/rest/skema/hentEgnePersSkemaData?startdato=" + startDate + "&slutdato=" + endDate
	}).then(function(data) {
		var scheduleReturn = {};
		for (dayKey in data["begivenhedMap"]) {
			var day = data["begivenhedMap"][dayKey];
			var returnDay = {};
			for (classKey in day) {
				var returnClass = {};
				var theClass = day[classKey];
				var skemabeg_id = theClass["skemabeg_id"];

				var timezoneOffset = "+" + leadingZeroes(-(new Date(theClass["start"]).getTimezoneOffset()/60)) + ":00";

				//The class name
				returnClass["Name"] = theClass["kortBetegnelse"];

				//Start and end times
				returnClass["Start"] = fixTimezone(new Date(theClass["start"] + timezoneOffset));
				returnClass["End"] = fixTimezone(new Date(theClass["slut"] + timezoneOffset));
				returnClass["objekt_id"] = theClass["objekt_id"];

				//Niveau, as in A, B, and C.
				returnClass["Level"] = theClass["niveau"];

				//Location
				returnClass["Rooms"] = [];
				for (room in theClass["lokaleList"]) {
					returnClass["Rooms"].push(theClass["lokaleList"][room]["lokalenr"]);
				}



				//Teachers
				returnClass["Teachers"] = [];
				for (worker in theClass["medarbejderList"]) {
					returnClass["Teachers"].push(theClass["medarbejderList"][worker]["initialer"]);
				}

				//The note
				if (typeof data["note2Map"][skemabeg_id] !== "undefined") {
					returnClass["Note"] = data["note2Map"][skemabeg_id]["tekst"];
					returnClass["GoogleFiles"] = data["note2Map"][skemabeg_id]["googleFileCount"];
				}


				returnDay[classKey] = returnClass;


			}
			scheduleReturn[ToShortISODate(dayKey)] = returnDay;
		}
		cacheScheduleFetch(startDate, endDate, scheduleReturn);
		callback(scheduleReturn, message);
	}).fail(function(XMLHttpRequest, textStatus, errorThrown) {
		message = 'Not connected to the internet';
		if (XMLHttpRequest.status === 401) {
			//TODO: Oversæt
			message = 'Not logged in to UDDATA+';
		}
		getStorage('scheduleCaches', true, function(obj) {
			if (!chrome.runtime.error) {
				var scheduleCaches = obj.scheduleCaches;
				var curDate = moment(startDate);
				var endDate = moment("2050-11-11");
				var toReturn = {};
				var i = 0;
				while (!curDate.isAfter(endDate) && i < 50) {
					var shortISO = ToShortISODate(curDate);
					if (typeof obj.scheduleCaches[shortISO] !== 'undefined') {
						toReturn[shortISO] = JSON.parse(obj.scheduleCaches[shortISO]);

						for (classes in toReturn[shortISO]) {
							toReturn[shortISO][classes]['Start'] = new Date(toReturn[shortISO][classes]['Start']);
							toReturn[shortISO][classes]['End'] = new Date(toReturn[shortISO][classes]['End']);
						}
					}
					curDate.add(1, 'days');
					i++;
				}
				callback(toReturn, message);

			}
		});
	}
	);
}

var weekDays = {
	0: "Sunday",
	1: "Monday",
	2: "Tuesday",
	3: "Wednesday",
	4: "Thursday",
	5: "Friday",
	6: "Saturday"
};

getStorage('lang', function(obj) {
	if (!chrome.runtime.error) {
		if (obj.lang == 'dansk') {
			weekDays = {
				0: "Søndag",
				1: "Mandag",
				2: "Tirsdag",
				3: "Onsdag",
				4: "Torsdag",
				5: "Fredag",
				6: "Lørdag"
			}

		}
	}
});

function getWeekNumber(d) {
	d.setHours(0,0,0,0);
	d.setDate(d.getDate()+4-(d.getDay()||7));
	return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

var debugMode = false;

function arraysSame(array1, array2) {
	var same = true;
	if (array1.length == array2.length) {
		array1.every(function(element, index) {
			if (element != array2[index]) same = false;
		});
	} else {
		same = false;
	}
	return same;
}

function contains(array, element) {
	for (i=0; i<array.length; i++) {
		if (typeof element === 'object') {
			if (arraysSame(array[i], element)) return true;
		}
		if (array[i] == element) return true;
	}
	return false;
}

getStorage('devMode', function(obj) {
	if (!chrome.runtime.error) debugMode = obj.devMode;
});

function debugLog(statement) {
	if (debugMode) console.log(statement);
}

String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}
