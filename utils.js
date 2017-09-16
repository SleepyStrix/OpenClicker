const { remote } = require('electron');

let test = function() {
	console.log("test debug");
	alert("eeee");
}

let hide_div = function(id) {
	document.getElementById(id).style.display = 'none';
}

let show_div = function(id) {
	document.getElementById(id).style.display = 'initial';
}

let switch_div = function(current_id, next_id) {
	console.log(`switching from ${current_id} to ${next_id}`);
	hide_div(current_id);
	show_div(next_id);
}

let load_page_in_current = function(page_url) {
	console.log(remote);
}

let new_quiz = function(quiz) {
	var quiz = {
		"title" : "",
		"options" : []
	}
	return quiz;
}

let save_question = function() {
	var question = {
		"options" : []
	}
	for (var i = 0; i < 4; i++) {
		let option_num = i + 1;
		var option = {
			"text" : document.getElementById('option_' + option_num).value,
			"correct" : document.getElementById('option_' + option_num + '_correct').checked
		}
		question.options.push(option);		
		console.log(option);
	}
	
	//question validation	
}
