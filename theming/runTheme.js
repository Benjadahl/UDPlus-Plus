/*			runTheme.js

        THIS FUNCTION IS USED TO APPLY THE GIVEN THEME



*/

//Changes color off each element in the current theme
function runTheme(theme, page){
	console.log("Loading theme: " + theme);
	$('.UDPPCustom').remove();
	if(typeof themes[theme] != "undefined") {
		for (var T in themes[theme]) {

      applySelector(T, themes[theme][T], page);

		}
	} else {
		//This will run if a custom theme is on

		//This is the same as our themes just with a few extra steps involving the customTemplate
		for(var T in customTheme[theme]){
			for(var X in customTemplate[T]){


        applySelector(customTemplate[T][X], customTheme[theme][T], page);

			}
		}
	}
}

function applySelector(selector, value, page){
  if(typeof PlusPlusList.general[selector] !== "undefined") {
		PlusPlusList.general[selector].value = value;
		PlusPlusList.general[selector].apply();
	}
	if(typeof PlusPlusList[page][selector] !== "undefined") {
		PlusPlusList[page][selector].value = value;
		PlusPlusList[page][selector].apply();
	}
}
