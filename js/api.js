

function api_logIn(params){	
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
	api_url = "http://timeapi.pxp200.com/api/v1/boards/cards_for_user/" + board_key
	$.ajax({
		type:"GET",
		beforeSend: function(request){
			request.setRequestHeader("Authorization", "Token token=" + api_key);
		},
		url:api_url,
		success: function(data){
			console.log(data);
			setCards(data.cards);
		},
		failure: function(data){
			return false;
		}
	})
	return false;	
}

function api_get_list(api_key, card_key){
	api_url = "http://timeapi.pxp200.com/api/v1/cards/" + card_key
	$.ajax({
		type:"GET",
		beforeSend: function(request){
			request.setRequestHeader("Authorization", "Token token=" + api_key);
		},
		url:api_url,
		success: function(data){
			console.log(data);
			setList(data.card);
		},
		failure: function(data){
			return false;
		}
	})
	return false;	
}

function api_report_time(api_key, board_key, card_key, list_apikey,hours,minutes){
	var api_url = "http://timeapi.pxp200.com/api/v1/entries"
	var params = {
		'minutes':minutes,
		'hours': hours,
		'board_apikey':board_key,
		'list_apikey':list_apikey,
		'card_apikey': card_key
	}
	console.log(params,'parameters for reporting')
	$.ajax({
		type:"POST",
		beforeSend: function(request){
			request.setRequestHeader("Authorization", "Token token=" + api_key);
		},
		date:JSON.stringify(params),
		url:api_url,
		success: function(data){
			console.log(data)
			alert("Success.")
		},
		failure: function(data){
			console.log(data)
			return false;
		}
	})
}