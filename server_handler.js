const http = require('http');
const port = 3000;
var eeeeeeeeee = "aaaaaaaaa";

const requestHandler = (request, response) => {
	console.log(request.url);
	response.end("You're connected, hello!");
}

const server = http.createServer(requestHandler);

module.exports = {
	start_server_listen : function () {		
		server.listen(port, (err) => {
			if (err) {
				return console.log("Oh shit!", err);
				throw err;
			}
			console.log(`Server listening on port: ${port}`);
		});
	},
	
	get_port : function() {
		return port;
	}
};
