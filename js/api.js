

function api_log_in(params){	
	api_url = "http://timeapi.pxp200.com/api/v1/users/authenticate";
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
	})
	return false;
}	


function api_get_boards(api_key){
	api_url = "http://timeapi.pxp200.com/api/v1/boards"

	$.ajax({
		type:"GET",
		beforeSend: function(request){
			request.setRequestHeader("Authorization", "Token token=" + api_key);
		},
		url:api_url,
		success: function(data){
			console.log(data);
			setBoards(data.boards);
		},
		failure: function(data){
			return false;
		}
	})
	return false;
}

function api_get_cards(api_key, board_key){
	api_url = "http://timeapi.pxp200.com/api/v1/boards/cards_for_user/:" + board_key
	$.ajax({
		type:"GET",
		beforeSend: function(request){
			request.setRequestHeader("Authorization", "Token token=" + api_key);
		},
		url:api_url,
		success: function(data){
			console.log(data);
			setCards(data);
		},
		failure: function(data){
			return false;
		}
	})
	return false;	
}