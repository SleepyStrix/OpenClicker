const {
	remote
} = require('electron');
const fs = require('fs');
const server_handler = require("./server_handler");

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
	for (var j = 0; j < 5; j++) {
		var question = {
			"question_text": "",
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

var running_quiz_allow_answers = false;
var running_quiz = null;
var running_question_index = -1;
var running_quiz_code = null;
var running_quiz_user_answers = [];
let onclick_run_quiz = function () {
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
		console.log(document.getElementById('quiz_run_title'));
		document.getElementById('quiz_run_title').innerText = running_quiz.title;
	}
}

let onclick_open_quiz = function() {
	console.log("opening quiz");
	console.log(server_handler);
	server_handler.start_server_listen();
	var randomstring = require("randomstring");
	running_quiz_code = randomstring.generate({
		length: 4,
		charset: 'alphabetic'
	}).toUpperCase();
	console.log("QUIZ CODE GENERATED:" + running_quiz_code);
	var ip = require("ip");
	document.getElementById('quiz_join_info').innerText =
	"Quiz is open, please enter: " + ip.address() + ":" + server_handler.get_port() + " with Quiz Code: " + running_quiz_code;
}

let onclick_start_quiz = function() {
	console.log("starting quiz");
	running_quiz_allow_answers = true;
	document.getElementById('open_quiz_button').style.display = 'none';
	document.getElementById('start_quiz_button').style.display = 'none';
	next_question();
}

let next_question = function() {
	let next_index = running_question_index + 1;
	if (next_index >= 4) {
		
	} else {
		running_question_index = next_index;
		console.log(running_question_index);
		var running_question = running_quiz.questions[running_question_index];
		document.getElementById('run_answer_1').innerText = running_question.options[0].text;
		document.getElementById('run_answer_2').innerText = running_question.options[1].text;
		document.getElementById('run_answer_3').innerText = running_question.options[2].text;
		document.getElementById('run_answer_4').innerText = running_question.options[3].text;	
	}
}

let end_quiz = function() {
	running_quiz_allow_answers = false;
}