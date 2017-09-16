const express = require('express');
const express_app = express();
const port = 3000;
var eeeeeeeeee = "aaaaaaaaa";
const path = require('path');

let start_server_listen = function () {

	express_app.set('port', port);
	express_app.use(express.static(path.join(__dirname, 'public')));
	var server = express_app.listen(express_app.get('port'), function () {});

	express_app.get('/quiz', (request, response) => {
		if (running_quiz != undefined && running_quiz != null && running_question_index >= 0) {
			var quiz_status = {
				"title" : running_quiz.title,
				"question" : running_quiz.questions[running_question_index]
			}
			response.send(quiz_status);
		} else {
			console.log("running question index: " + running_question_index);
			response.send("");
		}
	});

	/*express_app.listen(port, (err) => {
	if (err) {
	return console.log('Oh shit :(', err)
	}

	console.log(`Server listening on port: ${port}`)
	});*/

	/*	express_app.get('/quiz', (request, response) => {
	fs.
	response.send();
	});*/
}

module.exports = {
	start_server_listen: start_server_listen,
	get_port: function () {
		return port;
	}
};
