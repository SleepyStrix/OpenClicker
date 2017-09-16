const express = require('express');
const express_app = express();
const port = 3000;
const path = require('path');
const async = require('async');
const bodyParser = require('body-parser');
const truncate = require('truncate');

let start_server_listen = function () {

	express_app.set('port', port);
	express_app.use(express.static(path.join(__dirname, 'public')));
	express_app.use(bodyParser.urlencoded({ extended: false }));
	express_app.use(bodyParser.json())
	var server = express_app.listen(express_app.get('port'), function () {});
	
	express_app.get('/quiz', (request, response) => {
		if (running_quiz != undefined && running_quiz != null && running_question_index >= 0) {
			var ques = running_quiz.questions[running_question_index];
			var quiz_status = {
				"title" : running_quiz.title,
				"question" : {
					"question_text" : ques.question_text,
					"options" : []
				}
			}
			//only grab the parts of each option we need to sync, NOT THE ANSWERS
			async.each(ques.options, function (option, callback) {
				var option_status = {
					"text" : option.text
				}
				quiz_status.question.options.push(option_status);
				callback();
			}, function (err) {
				if (err) {
					console.log("FUC: " + err);
				} else {
					console.log("sending status");
					//console.log(quiz_status);
					response.send(JSON.stringify(quiz_status));
				}
			});
		} else {
			console.log("running question index: " + running_question_index);
			response.send("");
		}
	});
	
		//express_app.use(bodyParser);
	express_app.post('/quiz', function (req, res) {
		console.log("POST RECIEVED");
		//TODO: should do json validation here also
		console.log(req.body);
		user_answer = {
			"request_ip": req.ip,
			"client_user_id": (req.body["body[client_user_id]"] || "").toLowerCase(),
			"quiz_code": (req.body["body[quiz_code]"] || "").toUpperCase(),
			"answer_number": req.body["body[answer_number]"],
			"recieved_timestamp": Date.now()			
		}
		console.log(user_answer);
		if (running_quiz_allow_answers === true && running_quiz != null && user_answer.quiz_code == running_quiz_code) {
			var key = `CLIENT_USER_ID:${user_answer.client_user_id}`
			/*var existing_answer = running_quiz_user_answers[key];
			if (existing_answer) {
				
			}*/
			console.log("user answer stored");
			running_quiz_user_answers[key] = user_answer;
		} else {
			console.log("user answer rejected");
		}
	});
}



module.exports = {
	start_server_listen: start_server_listen,
	get_port: function () {
		return port;
	}
};
