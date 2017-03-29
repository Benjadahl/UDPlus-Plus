function stringToList(string) {
	var thelist = string.split(",");
	for (var i=0; i<thelist.length; i++) {
		thelist[i] = thelist[i].replace(/\s/g, "");
		if (thelist[i] == "") thelist.splice(i,1);
	}
	if (thelist === [""]) thelist.splice(0,1);
	return thelist;
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

Date.prototype.getWeekNumber = function() {
	var d = new Date(+this);
	d.setHours(0,0,0,0);
	d.setDate(d.getDate()+4-(d.getDay()||7));
	return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};
