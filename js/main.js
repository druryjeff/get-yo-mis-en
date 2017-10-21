// Variables

var menuOpen = document.querySelector(".menu-open");
var header = document.querySelector("header");
var loaded = 0;


// Create Nodes

var mainMenu = document.createElement("nav");
mainMenu.setAttribute("class","main-menu");
document.body.appendChild(mainMenu);

var menuClose = document.createElement("a");
menuClose.setAttribute("class","menu-close");
var menuCloseIcon = document.createElement("i");
menuCloseIcon.setAttribute("class","fa fa-times");
menuCloseIcon.setAttribute("aria-hidden","true");
menuClose.appendChild(menuCloseIcon);
header.appendChild(menuClose);


// Events

menuClose.addEventListener("click", function(e){
	hideNav();
});

menuOpen.addEventListener("click", function(e){
	e.preventDefault();
	(loaded==0) ? loadNav() : showNav();
});


// Functions

function hideNav(){
	mainMenu.classList.add("js-hide");
	menuClose.classList.add("js-hide");
	menuOpen.classList.remove("js-hide");
}

function showNav(){
	menuOpen.classList.add("js-hide");
	mainMenu.classList.remove("js-hide");
	menuClose.classList.remove("js-hide");
}

function loadNav(){
	var request = new XMLHttpRequest();
	request.open('GET', 'menu.html', true);
	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	  	// Load content from menu.html
	    var resp = request.responseText;
	    // Create parser to filter loadedcontent
	    var parser = new DOMParser();
	    var htmlDoc = parser.parseFromString(resp,"text/html");
	    // Select the .main-menu from content
	    var tds = htmlDoc.querySelector(".main-menu ul");
	    // Append .main-menu to requesting page
	   	mainMenu.appendChild(tds);
	   	// Content is loaded
	   	loaded = 1;
	   	// Show nav overlay
	   	showNav();
	  } else {
	    // We reached our target server, but it returned an error
	  }
	};
	request.onerror = function() {
	  // There was a connection error of some sort
	  alert("Error");
	};
	request.send();
}


// Initialize

hideNav();

