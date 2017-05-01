function stringToList(string) {
	var thelist = string.split(",");
	for (var i=0; i<thelist.length; i++) {
		thelist[i] = thelist[i].replace(/\s/g, "");
		if (thelist[i] == "") thelist.splice(i,1);
	}
	if (thelist === [""]) thelist.splice(0,1);
	return thelist;
}


// http://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=CELEX:32000L0084:DA:HTML
var currentTimeZone = null;
function getDanishTimezone(currentTime) {
	if (currentTimeZone == null || new Date().setHours(0,0,0,0) != currentTime.setHours(0,0,0,0)) {
		var currentYear = currentTime.getUTCFullYear();
		var startSummerTimeDay = 31;
		var endSummerTimeDay = 31;
		while (new Date(currentYear + "-03-" + startSummerTimeDay).getDay() != 0 && startSummerTimeDay > 15) startSummerTimeDay--;
		while (new Date(currentYear + "-10-" + endSummerTimeDay).getDay() != 0 && endSummerTimeDay > 15) endSummerTimeDay--;
		var startSummerTime = new Date(currentYear + "-03-" + startSummerTimeDay);
		var endSummerTime = new Date(currentYear + "-10-" + endSummerTimeDay);
		if (startSummerTime < currentTime && currentTime < endSummerTime) {
			if (currentTime.setHours(0,0,0,0) == new Date()) currentTimeZone = 2;
			return 2;
		} else {
			if (currentTime.setHours(0,0,0,0) == new Date()) currentTimeZone = 1;
			return 1;
		}
	}
	return currentTimeZone;
}

function UDDateToDate(date) {
	var split1 = date.split("T");
	var date = split1[0].split("-");
	var year = date[0];
	var month = parseInt(date[1])-1;
	var day = parseInt(date[2]);

	var time = split1[1].split(":");
	var hour = parseInt(time[0]);
	var minute = parseInt(time[1]);
	var second = parseInt(time[2]);

	var danishTZ = getDanishTimezone(new Date(date));
	hour = hour - danishTZ;
	/*
	if (hour > 24) {
		hour = hour - 24;
		date = date + 1;
	}*/

	//console.log(year, month, day, hour, minute, second);
	return new Date(Date.UTC(year, month, day, hour, minute, second));

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
		url: "https://www.uddataplus.dk/services/rest/skema/hentEgnePersSkemaData?startdato=" + startDate + "&slutdato=" + endDate,
		timeout: 5000,
		dataType: "json",
	}).then(function(data) {
		var scheduleReturn = {};
		debugLog(data);
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
				returnClass["Start"] = UDDateToDate(theClass["start"]);
				returnClass["End"] = UDDateToDate(theClass["slut"]);
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
		debugLog("Request failed", errorThrown);
		message = 'Something went wrong getting the schedule.';
		//TODO: Oversæt
		if (XMLHttpRequest.status === 401) {
			message = 'Not logged in to UDDATA+.';
		} else if (textStatus == "timeout") {
			message = "Request to UDDATA+ timed out.";
		} else if (textStatus == "parsererror") {
			message = "UDDATA+ didn't return a valid schedule.";
		} else if (XMLHttpRequest.status == 418) {
			message = "HTTP error 418: I am a teapot";
		} else if (errorThrown == "Service Unavailable") {
			message = "UDDATA+ is down";
		}
		getStorage('scheduleCaches', true, function(obj) {
			if (!chrome.runtime.error && typeof obj.scheduleCaches !== 'undefined') {
				var scheduleCaches = obj.scheduleCaches;
				var curDate = moment(startDate);
				var endDate = moment("2050-11-11");
				var toReturn = {};
				var i = 0;
				if (typeof scheduleCaches !== 'undefined') {
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
				} else {
					message += ", and no cache found";
					callback(null, message);
				}
				message = message + " Showing cached schedule";
				callback(toReturn, message);
			} else {
				message += ", and no cache found";
				callback(null, message);
			}
		});
	});
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
	var yearStart = new Date(d.getFullYear(),0,1);
	var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
	return weekNo;

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

