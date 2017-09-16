const {
	remote
} = require('electron');



let test = function () {
	console.log("test debug");
	alert("eeee");
}

let hide_div = function (id) {
	document.getElementById(id).style.display = 'none';
}

let show_div = function (id) {
	document.getElementById(id).style.display = 'initial';
}

let switch_div = function (current_id, next_id) {
	console.log(`switching from ${current_id} to ${next_id}`);
	hide_div(current_id);
	show_div(next_id);
}

let load_page_in_current = function (page_url) {
	console.log(remote);
}

let open_quiz_builder = function () {
	current_quiz = new_quiz();
	load_current_question();
	switch_div('main_menu','quiz_builder');
}

var current_quiz = null;
var current_question_index = 0;

let new_quiz = function (quiz) {
	var quiz = {
		"title": "",
		"questions": []
	}
	for (var j = 0; j < 5; j++) {
		var question = {
			"question_text" : "",
			"options": []
		}
		for (var i = 0; i < 4; i++) {
			var option = {
				"text": "",
				"correct": false
			}
			question.options.push(option);
		}
		quiz.questions.push(question);
	}
	current_question = quiz.questions[0];
	return quiz;
}

let save_question = function () {
	var question = {
		"question_text" : "",
		"options": []
	}
	question.question_text = document.getElementById('question_text').value || "";
	for (var i = 0; i < 4; i++) {
		let option_num = i + 1;
		var option = {
			"text": document.getElementById('option_' + option_num).value,
			"correct": document.getElementById('option_' + option_num + '_correct').checked
		}
		question.options.push(option);
		//console.log(option);
	}
	console.log("saving question:");
	console.log(question);
	current_quiz.questions[current_question_index] = question;
	//current_question = question;
	//question validation
}

let onclick_question_page = function (page_num) {
	console.log("switching to question " + page_num);
	save_question();
	current_question_index = page_num - 1;
	load_current_question();
}

let load_current_question = function() {
	var current_question = current_quiz.questions[current_question_index];
	console.log("Loading question:");
	console.log(current_question);
	for (var i = 0; i < 4; i++) {
		let option_num = i + 1;
		document.getElementById('question_text').value = current_question.quesion_text || "";
		document.getElementById('option_' + option_num).value = current_question.options[i].text;
		document.getElementById('option_' + option_num + '_correct').checked = current_question.options[i].correct;
		//console.log(option);
	}
}

let save_quiz = function() {
	save_question();
	current_quiz.title = document.getElementById('quiz_title').value;
	var { dialog } = require('electron').remote;	
	var path = dialog.showSaveDialog({buttonLabel: "Save Quiz"}) + ".json";
	// writefile.js
	var fs = require('fs');
	var content = JSON.stringify(current_quiz);
	if (path != undefined && path != null && path != "") {
		fs.writeFile(path, content, 'utf8', function(err) {
		if (err) throw err;
		});
	}
}

let load_quiz = function () {
}
