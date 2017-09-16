const {
	remote
} = require('electron');
const fs = require('fs');
const server_handler = require("./server_handler");
const query = require('array-query');

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
	switch_div('main_menu', 'quiz_builder');
}

var current_quiz = null;
var current_question_index = 0;

let new_quiz = function (quiz) {
	var quiz = {
		"title": "",
		"questions": []
	}
	for (var j = 0; j < 4; j++) {
		var question = {
			"question_text": "",
			"question_num": j + 1,
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
		"question_text": "",
		"question_num": current_question_index + 1,
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

let load_current_question = function () {
	var current_question = current_quiz.questions[current_question_index];
	console.log("Loading question:");
	console.log(current_question);
	document.getElementById('question_text').value = current_question.question_text;
	for (var i = 0; i < 4; i++) {
		let option_num = i + 1;
		document.getElementById('option_' + option_num).value = current_question.options[i].text;
		document.getElementById('option_' + option_num + '_correct').checked = current_question.options[i].correct;
		//console.log(option);
	}
}

let save_quiz = function () {
	save_question();
	current_quiz.title = document.getElementById('quiz_title').value;
	var {
		dialog
	} = require('electron').remote;
	var path = dialog.showSaveDialog({
			buttonLabel: "Save Quiz"
		}) + ".json";
	// writefile.js

	var content = JSON.stringify(current_quiz);
	if (path != undefined && path != null && path != "") {
		fs.writeFile(path, content, 'utf8', function (err) {
			if (err)
				throw err;
		});
	}
}

let load_quiz_in_editor = function () {
	//TODO: load quiz to be edited later
}

var running_quiz_results = false;
var running_quiz = null;
var running_question_index = -1;
var running_quiz_code = null;
var running_quiz_user_answers = [];
let onclick_run_quiz = function () {
	//console.log("run clicke");
	var {
		dialog
	} = require('electron').remote;
	var path = dialog.showOpenDialog({
			properties: ['openFile']
		})[0];
	console.log(path);
	if (path != undefined && path != null && path != "") {
		var json_string = fs.readFileSync(path, "utf8");
		var quiz = JSON.parse(json_string);
		running_quiz = quiz;
		console.log("Quiz loaded");
		console.log(quiz);
		switch_div('main_menu', 'quiz_runner');
		//console.log(document.getElementById('quiz_run_title'));
		document.getElementById('quiz_run_title').innerText = running_quiz.title;
	}
}

let onclick_open_quiz = function () {
	console.log("opening quiz");
	document.getElementById('open_quiz_button').style.display = 'none';
	//console.log(server_handler);
	server_handler.start_server_listen();
	var randomstring = require("randomstring");
	running_quiz_code = randomstring.generate({
			length: 4,
			charset: 'alphabetic'
		}).toUpperCase();
	console.log("QUIZ CODE GENERATED:" + running_quiz_code);
	var ip = require("ip");
	document.getElementById('quiz_join_info').innerText = "Quiz is OPEN. Go to Quiz URL in you web browser, then enter the Quiz Code and your ID.";
	document.getElementById('quiz_address').innerText = ip.address() + ":" + server_handler.get_port()
		document.getElementById('quiz_code_display').innerText = running_quiz_code;
	document.getElementById('start_quiz_button').style.display = 'initial';

	//var running_question = running_quiz.questions[running_question_index];
	//prep quiz object to hold answers
	for (var i = 0; i < running_quiz.questions.length; i++) {
		running_quiz.questions[i]["user_answers"] = [];
	}
}

let onclick_start_quiz = function () {
	console.log("starting quiz");
	running_quiz_allow_answers = true;

	document.getElementById('start_quiz_button').style.display = 'none';
	document.getElementById('next_question_button').style.display = 'initial';
	next_question();
}

let next_question = function () {
	let next_index = running_question_index + 1;
	console.log("next-index: " + next_index);
	if (next_index == 3) {
		document.getElementById('next_question_button').style.display = 'none';
		if (running_quiz_allow_answers) {
			document.getElementById('end_quiz_button').style.display = 'initial';
		}
	} else {
		document.getElementById('next_question_button').style.display = 'initial';
		document.getElementById('end_quiz_button').style.display = 'none';
	}

	if (next_index == 4) {}
	else {
		running_question_index = next_index;
		console.log(running_question_index);
		var running_question = running_quiz.questions[running_question_index];
		document.getElementById('run_answer_1').innerText = "1. " + running_question.options[0].text;
		document.getElementById('run_answer_2').innerText = "2. " + running_question.options[1].text;
		document.getElementById('run_answer_3').innerText = "3. " + running_question.options[2].text;
		document.getElementById('run_answer_4').innerText = "4. " + running_question.options[3].text;
		//alert(running_question.question_text);
		document.getElementById('running_question_text').innerText = running_question.question_text;
	}

}

let close_quiz = function () {
	document.getElementById('quiz_join_info').innerText = "Quiz is closed. No further answers will be accepted."
		running_quiz_allow_answers = false;
	document.getElementById('end_quiz_button').style.display = 'none';
	document.getElementById('view_quiz_results_button').style.display = 'initial';
	generate_results();

	/*running_question_index = -1;
	document.getElementById('run_answer_1').innerText = "";
	document.getElementById('run_answer_2').innerText = "";
	document.getElementById('run_answer_3').innerText = "";
	document.getElementById('run_answer_4').innerText = "";*/
}

let generate_results = function () {
	//var running_question = running_quiz.questions[running_question_index];
	//console.log(running_question);
	var final_results = [];
	console.log(running_quiz);
	running_quiz.questions.forEach(function (question, question_index, question_array) {
		//console.log(question);
		Object.keys(question.user_answers).forEach(function (user_answer_key, index, array) {
			//console.log(user_answer);
			var user_answer = question.user_answers[user_answer_key];
			let result = {
				"request_ip": user_answer.request_ip,
				"client_user_id": user_answer.client_user_id,
				"quiz_code": user_answer.quiz_code,
				"answer_number": user_answer.answer_number,
				"recieved_timestamp": user_answer.recieved_timestamp,
				"question_number": user_answer.question_num
			}
			final_results.push(result);
			//console.log(final_results.length);
		});
	});

	/*final_results.forEach(function (question, question_index, question_array) {

	});*/
	/*for (int i = 0; i < 4; i++) {
	var q1 = query("question_number")
	}*/
	//console.log("total results: " + final_results.length);
	//running_question.user_answers[key] = user_answer;
}

var question_results = null;
