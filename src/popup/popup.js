// use strict;
// document.getElementById("login").addEventListener("click", handleLogin);
var clock = null
var apikey = null
if(localStorage.getItem('login') === null){
	console.log("Not Logged in.")
}
else {
	loggedIn()
}
function loggedIn(){
	var user = JSON.parse( localStorage.getItem('user'));
	apikey = user.user.private_profile.apikey
	boards = api_get_boards(apikey);

	if(localStorage.getItem('start') === null){
		document.getElementById("container").outerHTML = '<div id="container"><div id="boards"></div><div id="timer"><button id="start">start</button></div><a id="logout"><button>Logout</button></a></div>'
	}
	else{
		document.getElementById('container').outerHTML = '<div id="container"><div id="timer"><div id="time"></div><button id="stop">stop and send</button></div><button id="logout">Logout</button></div>';
		setTimeout(display,1000)
	}
}

$('#login').click(function(){
		console.log("clicked");
		username = document.getElementById("username").value
		password = document.getElementById("password").value
		params = {
			"email": username,
			"password": password
		}
		api_logIn(params)
})

$("#logout").click(function(){
		localStorage.removeItem('login');
		localStorage.removeItem('user');
		localStorage.removeItem('start')
		document.getElementById("container").outerHTML = '</div id="container"> <form><input type="text" id="username" value="email">				<input type="password" id="password" value="password">				<a id="login">				<button value="login">Login</button>				</a>			</form></div>'
		return false;
})

$('#start').click(function(){
	var start = new Date()
	localStorage.setItem('start',start);
	document.getElementById('timer').outerHTML = '<div id="timer"><div id="time"></div><button id="stop">stop and send</button></div>';
	clock = setTimeout(display,1000);
})

$('#stop').click(function(){
	var endTime = new Date()
	var startTime = localStorage.getItem('start');

	var timeDif = endTime - -startTime;
	timeDif = timeDif/1000
	var seconds = Math.round(timeDif % 60)
	timeDif = timeDif/60
	var minutes = Math.round(timeDif % 60)
	timeDif = timeDif/60
	var hours = timeDif
	var params = {
		'hours':hours,
		'minutes':minutes
	}
	document.getElementById('timer').outerHTML = '<div id="timer"><button id="start">start</button></div>';
	localStorage.removeItem('start');
	clearTimeout(clock);
})

function display(){
	var endTime = new Date();
	var startTime = Date.parse(localStorage.getItem('start'));
	console.log(startTime, 'start', typeof(startTime));
	console.log(endTime, 'end', typeof(endTime))
	var timeDif = endTime - startTime
	console.log(timeDif, 'dif')
	timeDif = timeDif/1000
	var seconds = Math.round(timeDif % 60)
	timeDif = timeDif/60
	var minutes = Math.round(timeDif % 60)

	timeDif = timeDif/60
	var hours = Math.round(timeDif % 24);
	timeDif = timeDif / 24
	days = Math.round(timeDif)

	if(seconds < 10){
		seconds = "0" + seconds
	}
	if(minutes < 10){
		minutes = "0" + minutes;
	}
  $("#time").text(days + " days, " + hours + ":" + minutes + ":" + seconds);
	setTimeout(display, 1000)
}

function setBoards(boards){
	html = document.getElementById('boards')
	html.innerHTML = "<form><select class='target' id='board_list'></select></form>"
	board_list = document.getElementById('board_list')
	board_list.innerHTML += "<option value='0' selected='seleected'>---</option"
	boards.forEach(function(board){
		board_list.innerHTML += "<option value='" + board.public.apikey +"'>" + board.public.name + "</option"
	})
}
// Trying to get this function working.
$('.target').change(function(){
	alert("CHANGED")
})
function setCards(cards){
	html = document.getElementById('boards')
	html.innerHTML += "<select id='card_list'></select>"
	card_list.innerHTML += "<option value='0'>---</option"
	cards.forEach(function(card){
		card_list.innerHTML += "<option value='" + card.public.apikey +"'>" + card.public.name + "</option"
	})
}
