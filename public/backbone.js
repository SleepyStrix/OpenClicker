var check_quiz_status_on = false;
let client_get_quiz_status = function () {
if (check_quiz_status_on == true) {
		var url = window.location.href;
		url = url.replace("#", "");
		url = url + "quiz";
		console.log(url);
		$.get(
			url, {
			paramOne: 1,
			paramX: 'abc'
		},
			function (data) {
				console.log(data);
				if (data != undefined && data != null && data != "") {
					var quiz_status = JSON.parse(data);
					document.getElementById('client_quiz_run_title').innerText = quiz_status.title;
					document.getElementById('client_answer_button_1').innerText = quiz_status.question.options[0].text;
					document.getElementById('client_answer_button_2').innerText = quiz_status.question.options[1].text;
					document.getElementById('client_answer_button_3').innerText = quiz_status.question.options[2].text;
					document.getElementById('client_answer_button_4').innerText = quiz_status.question.options[3].text;					
				}
			//alert('page content: ' + data);
		});
	}
	setTimeout(client_get_quiz_status, 2000);
}
