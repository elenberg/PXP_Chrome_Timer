// use strict;
// document.getElementById("login").addEventListener("click", handleLogin);
var clock = null
if(localStorage.getItem('login') === null){
	console.log("Not Logged in.")
}
else {
	loggedIn()
}
function loggedIn(){
	if(localStorage.getItem('start') === null){
	document.getElementById("container").outerHTML = '<div id="container"><div id="timer"><button id="start">start</button></div><a id="logout"><button>Logout</button></a></div>'
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
					localStorage.setItem('user', data)
					console.log(localStorage)
					loggedIn()
				}
			});
			return false;
		})

$("[id='logout']").click(function(){
	alert("logout")
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

