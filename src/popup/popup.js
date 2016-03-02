// use strict;
// document.getElementById("login").addEventListener("click", handleLogin);

function handleLogin(){
	username = document.getElementById("username").value
	password = document.getElementById("password").value
	if(username === 'brew coffee'){
		alert('418 Error. I\'m a teacup.');
	}
	else{
		api_url = "http://timeapi.pxp200.com/api/v1/users/authenticate";
		params = {
			"email": username,
			"password": password
		}
		xhr = new XMLHttpRequest();
		xhr.open("POST", api_url, true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(JSON.stringify(params));
		xhr.onreadystatechange = function () {
			console.log(xhr.readyState)
			var DONE = 4;
			var OK = 200
			if (xhr.readyState === DONE){
				if(xhr.status === OK){
					console.log(xhr.responseText, 'Response');
				}
				else{
					console.log('Error: ' + xhr.responseText);
				}
				console.log(xhr, 'xhr')
			}
		}
		
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
				},
				failure: function(){
					console.log("Faile")
					alert("FAILURE");
				}
			});
			return false;
		})