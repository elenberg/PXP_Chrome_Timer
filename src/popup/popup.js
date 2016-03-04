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
	$('#loggedOut').css("display", "none")
	if(localStorage.getItem('start') === null){
		// Start container
		$('#startContainer').css('display', '')		
		$('#stopContainer').css('display', 'none')		
	}
	else{
		// Stop container
		$('#startContainer').css('display', 'none')		
		$('#stopContainer').css('display', '')		
		setTimeout(display,1000)
	}
}

$("#logout").on("click",function(){
	localStorage.removeItem('login');
	localStorage.removeItem('user');
	localStorage.removeItem('start');
	localStorage.removeItem('card_key');
	localStorage.removeItem('board_key');
	localStorage.removeItem('list_apikey');
})

$('#login').on("click",function(e) {
	e.preventDefault();
	username = document.getElementById("username").value
	password = document.getElementById("password").value
	api_url = "http://timeapi.pxp200.com/api/v1/users/authenticate";
	params = {
		"email": username,
		"password": password
	}
	$.ajax({
				type:"POST",
				url:api_url,
				contentType:'application/json',
				dataType: 'json',
				data: JSON.stringify(params),
				success: function(data) {
					console.log("Success")
					console.log(data);
					localStorage.setItem('login', true)
					localStorage.setItem('user', JSON.stringify(data))
					console.log(localStorage)
					loggedIn()
				}
			});
	// return false;
})

$('#start').on("click",function(){
	var start = new Date()
	var card_key = document.getElementById('card_list').value	
	var board_key = document.getElementById('board_list').value
	localStorage.setItem('start',start);
	localStorage.setItem('card',card_key)
	localStorage.setItem('board', board_key)
	api_get_list(apikey, card_key);
	$('#startContainer').css('display', 'none')		
	$('#stopContainer').css('display', '')	
	clock = setTimeout(display,1000);
})

$('#stop').on("click",function(){
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
	var board_key = localStorage.getItem('board')
	var card_key = localStorage.getItem('card')
	var list_apikey = localStorage.getItem('list_apikey')
	var hours = localStorage.getItem('hours')
	var minutes = localStorage.getItem('minutes')
	api_report_time(apikey, board_key, card_key, list_apikey,hours,minutes)
	console.log('sending ', apikey, board_key, card_key, list_apikey, hours,minutes)
	localStorage.removeItem('start');
	localStorage.removeItem('card_key');
	localStorage.removeItem('board_key');
	localStorage.removeItem('list_apikey');
	clearTimeout(clock);
	$('#startContainer').css('display', '')		
	$('#stopContainer').css('display', 'none')	
	$('#start').css('display','none');
	
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

	localStorage.setItem('minutes',minutes)
	localStorage.setItem('hours',hours)
	if(seconds < 10){
		seconds = "0" + seconds
	}
	if(minutes < 10){
		minutes = "0" + minutes;
	}
  $("#time").text(days + " days, " + hours + ":" + minutes + ":" + seconds);
	clock = setTimeout(display, 1000)
}

function setBoards(boards){
	html = document.getElementById('boards')
	board_list = document.getElementById('board_list')
	boards.forEach(function(board){
		board_list.innerHTML += "<option value='" + board.public.apikey +"'>" + board.public.name + "</option"
	})
}
// Trying to get this function working.
$(document.body).on('change','#board_list', function(e){
	var board_key = document.getElementById('board_list').value
	console.log(board_key,'board_key')
	if(board_key != 0){
	api_get_cards(apikey, board_key)
	} else{
	$('#cards').css('display','none');
	$('#start').css('display','none')
	}
})

$(document.body).on('change','#card_list', function(e){
	var card_key = document.getElementById('card_list').value
	if (card_key !== 0){
	$('#start').css('display','');
	}
	else{
	$('#start').css('display','none');
	}
})

function setCards(cards){
	console.log(cards,'cards')
	$('#cards').css('display','');
	card_list = document.getElementById("card_list")
	cards.forEach(function(card){
		card_list.innerHTML += "<option value='" + card.public.apikey +"'>" + card.public.name + "</option"
	})
}

function setList(card){
	localStorage.setItem('list_apikey', card.list.public.apikey)
}