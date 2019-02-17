var nightCookie;
function toggleNightMode(){
	if (nightCookie[1] === 'true'){
		nightModeOff();
	}else{
		nightModeOn();
	}
}
function nightModeOn(){
	document.documentElement.setAttribute('data-theme', 'dark');
	nightCookie[1] = 'true';
	nightCookieOn();
}
function nightModeOff(){
	document.documentElement.setAttribute('data-theme', 'light');
	nightCookie[1] = 'false';
	nightCookieOff();
}




function createNightCookie(){
	document.cookie = "night=false; expires=Fri, 31 Dec 9999 23:59:59 GMT";
	console.log("Cookie created!");
}
function nightCookieOn(){
	document.cookie = "night=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}
function nightCookieOff(){
	document.cookie = "night=false; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}


function loadCookies(){
	var x = document.cookie; 
	x = x.split("; ");
	for (var i = x.length - 1; i >= 0; i--) {
		var cook = x[i].split("=");
		if (cook[0] === "night"){
			nightCookie = cook;
			if (cook[1] === 'true'){
				nightModeOn();
			}
		}
	}

}

document.addEventListener("DOMContentLoaded", function(event) { 
	loadCookies();	
	if (nightCookie === undefined){
		createNightCookie();
		loadCookies();	
	}
});