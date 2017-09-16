var check_quiz_status_on = false;
var question_num = -1;
let client_get_quiz_status = function () {
if (check_quiz_status_on == true) {
		var url = window.location.href;
		url = url.replace("#", "");
		url = url + "quiz";
		console.log(url);
		$.get(
			url, {
		},
			function (data) {
				console.log(data);
				if (data != undefined && data != null && data != "") {
					var quiz_status = JSON.parse(data);
					console.log(quiz_status);
					//console.log("yeet:" + quiz_status.question);
					question_num = quiz_status.question.question_num;
					document.getElementById('client_quiz_run_title').innerText = quiz_status.title;
					document.getElementById('client_question_run_text').innerText = quiz_status.question.question_text;
					document.getElementById('client_answer_button_1').innerText = "1. " + quiz_status.question.options[0].text;
					document.getElementById('client_answer_button_2').innerText = "2. " + quiz_status.question.options[1].text;
					document.getElementById('client_answer_button_3').innerText = "3. " + quiz_status.question.options[2].text;
					document.getElementById('client_answer_button_4').innerText = "4. " + quiz_status.question.options[3].text;					
				} else {
					document.getElementById('client_quiz_run_title').innerText = "";
					document.getElementById('client_answer_button_1').innerText = "";
					document.getElementById('client_answer_button_2').innerText = "";
					document.getElementById('client_answer_button_3').innerText = "";
					document.getElementById('client_answer_button_4').innerText = "";	
				}
			//alert('page content: ' + data);
		});
	}
	setTimeout(client_get_quiz_status, 2000);
}

let client_answer_onclick = function(answer_number) {
	var body = {
		"client_user_id": client_user_id.value,
		"quiz_code": client_quiz_code.value,
		"answer_number": answer_number,
		"question_num": question_num
	}
	//var body = JSON.stringify(body);
	console.log("BODY: " + body);
	var url = window.location.href;
	url = url.replace("#", "");
	url = url + "quiz";
	console.log("posting to url: " + url);
	$.post({
		"type": "POST",
		"url": url,
		"timeout": 5,
		"data": { "body": body },
	}).done(function () {
		console.log("posted answer: answer_number");
	});
}
