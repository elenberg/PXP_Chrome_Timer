$('#login').on("click",function(e) {
	console.log('normal')
	e.preventDefault();
	username = document.getElementById("email").value
	password = document.getElementById("password").value
	console.log(username, password)
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
					localStorage.setItem('login', true)
					localStorage.setItem('user', JSON.stringify(data))
					loggedIn()
				}
			});
	// return false;
})

$('#API_login').on("click",function(e) {
	console.log('api')
	e.preventDefault();
	trello_user = document.getElementById("trello_user").value
	api_key = document.getElementById("api_key").value
	api_url = "http://timeapi.pxp200.com/api/v1/users/"+trello_user;
	params = {
		"api_key": api_key
	}
	$.ajax({
		type:"GET",
		beforeSend: function(request){
			request.setRequestHeader("Authorization", "Token token=" + api_key);
		},
		url:api_url,
		success: function(data) {
			localStorage.setItem('login', true)
			localStorage.setItem('user', JSON.stringify(data))
			loggedIn()
		}
	});
	// return false;
})