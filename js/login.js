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
					localStorage.setItem('login', true)
					localStorage.setItem('user', JSON.stringify(data))
					loggedIn()
				}
			});
	// return false;
})