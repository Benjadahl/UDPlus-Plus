/*			runTheme.js

        THIS FUNCTION IS USED TO APPLY THE GIVEN THEME



*/

//Changes color off each element in the current theme
function runTheme(theme, page){
	debugLog("Loading theme: " + theme + "on page " + page);
	$('.UDPPCustom').remove();
	if(typeof themes[theme] != "undefined") {
		for (var T in themes[theme]) {

      applySelector(T, themes[theme][T], page);


		}
	} else {
		//This will run if a custom theme is on
		//
		//
		PlusPlusList.general.bodyBGAttachment.value = "fixed";
		PlusPlusList.general.bodyBGAttachment.apply();
		PlusPlusList.general.bodyBGPos.value = "center";
		PlusPlusList.general.bodyBGPos.apply();
		PlusPlusList.general.bodyBGRepeat.value = "no-repeat";
		PlusPlusList.general.bodyBGRepeat.apply();
		PlusPlusList.general.bodyBGSize.value = "cover";
		PlusPlusList.general.bodyBGSize.apply();


		//This is the same as our themes just with a few extra steps involving the customTemplate
		for(var T in customTheme[theme]){
			for(var X in customTemplate[T]){

				if(! /<[a-z][\s\S]*>/.test(customTheme[theme][T])){
					applySelector(customTemplate[T][X], customTheme[theme][T], page);
				}

				console.log(customTemplate[T][X]);

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
