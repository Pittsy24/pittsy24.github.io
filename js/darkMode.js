var x = document.cookie; 
console.log(x);
console.log("Cookies Fetched");


var nightCookie;

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
if (nightCookie === undefined){
	createNightCookie();
}


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
	document.cookie = "night=true";
}
function nightCookieOn(){
	document.cookie = "night=true";
}
function nightCookieOff(){
	document.cookie = "night=false";
}