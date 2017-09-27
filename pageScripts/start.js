
var checksDone = 0;
var maxChecks = 10;

//Check for checkbox every 1 second
var interval = setInterval(function(){
	console.log("fdfdsffdfsf");
	if($(".popupContent").length > 0){
		//It popped up, so we close it :-D
		var content = $(".popupContent > div > div > .modal-body > p").text();
		//We dont want to close the wrong popup.
		if(content == "Du har ikke rettigheder til at udføre denne service" || content == "Access denied for to this service"){
			debugLog("Found error popup: " + content);
			var button = $(".popupContent > div > div > div > .modal-footer > button");
			//AAAAND click
			button.click();
			//Now that it's gone, we won't check anymore
			clearInterval(interval);
		}

	}
	//If the popup does not occur after 10 seconds uddata probably fixed the popup. Good job.
	checksDone++;
	if(checksDone >= maxChecks){
		clearInterval(interval);
	}


}, 1000);
