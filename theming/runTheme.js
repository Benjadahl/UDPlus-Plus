/*			runTheme.js

  THIS FUNCTION IS USED TO APPLY THE GIVEN THEME



*/

//Changes color off each element in the current theme
function runTheme(theme, page){
	console.log("Loading theme: " + theme);
	$('.UDPPCustom').remove();
	if(typeof themes[theme] != "undefined"){
		for (var T in themes[theme]) {
			switch(T){
				case "navbarImg":
					changeColor(colorElements[T], "url(" + themes[theme][T] + ")");
					changeColor(colorElements["rightDropdown"], "rgba(0,0,0,0)")
					changeColor(colorElements["navbarIcon"], "rgba(0,0,0,0)")
					//changeColor(colorElements["profileRing"], "rgba(0,0,0,0)")
					break;
				case "mainBackImg":
					setTrans();
					changeColor(colorElements[T], "url(" + themes[theme][T] + ")");
					break;
				default:
					if(typeof PlusPlusList.general[T] !== "undefined") {
						PlusPlusList.general[T].value = themes[theme][T];
						PlusPlusList.general[T].apply();
					}
					if(typeof PlusPlusList[page][T] !== "undefined") {
						PlusPlusList[page][T].value = themes[theme][T];
						PlusPlusList[page][T].apply();
					}
					break;
			}
		}
	}else{
		//This will run if a custom theme is on

		//For getting static theme format out of customtheme. Comment this line on release
		var convertstring = "";

    
		//This is the same as our themes just with a few extra steps involving the customTemplate
		for(var T in customTheme[theme]){
			for(var X in customTemplate[T]){
        
        switch(customTemplate[T][X]){
				case "navbarImg":
					changeColor(colorElements[customTemplate[T][X]], "url(" + customTheme[theme][T] + ")");
					changeColor(colorElements["rightDropdown"], "rgba(0,0,0,0)")
					changeColor(colorElements["navbarIcon"], "rgba(0,0,0,0)")
					//changeColor(colorElements["profileRing"], "rgba(0,0,0,0)")
					break;
				case "mainBackImg":
					setTrans();
					changeColor(colorElements[customTemplate[T][X]], "url(" + customTheme[theme][T] + ")");
					break;
				case "homeworkMark":
					homeworkColour = customTheme[theme][T];
					break;
				default:
					if(typeof PlusPlusList.general[customTemplate[T][X]] !== "undefined") {
						PlusPlusList.general[customTemplate[T][X]].value = customTheme[theme][T];
						PlusPlusList.general[customTemplate[T][X]].apply();

					}
					break;
				}
			}
		}
	}
}
