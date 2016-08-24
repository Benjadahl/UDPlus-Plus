console.log("Uddata++ starting");

//Changes the current Uddata+ logo to the transparent version that allows the color of the navbar to be visible.
$("#navbar>div>div>a>img").attr("src",chrome.extension.getURL("UddataLogo.png"));

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "theme"){
            console.log(request.theme);
            navbarColor(request.theme.foreground);
            rightDropdown(request.theme.background);
            navbarIcon(request.theme.text);
        }
    }
);

$(".page-content>div>table").each(function( index ) {
  console.log( index + ": " + $( this ).text() );
});
