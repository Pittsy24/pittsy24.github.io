
function toggleNightMode(){
	if (localStorage.night == "true"){
		localStorage.night = "false";

		nightModeOff();
	}else{
		localStorage.night = "true";

		nightModeOn();
	}
}
function nightModeOn(){
	document.documentElement.setAttribute('data-theme', 'dark');
}

function nightModeOff(){
	document.documentElement.setAttribute('data-theme', 'light');
}



if (localStorage.night == "true"){
	nightModeOn();
}else{nightModeOff();}
