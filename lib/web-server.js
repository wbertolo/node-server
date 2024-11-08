const { createServer } = require("http");
const { createReadStream } = require("fs");

const sendFile = (res, status, type, file) => {
	res.writeHead(status, {'Content-Type' : 'text/html'});
	createReadStream(file).pipe(res);
}

createServer((req, res) => {
	switch(req.url) {
		case '/': 
			return sendFile(
				res,
				200,
				'text/html',
				'./site/home-page.html'
			)
		case '/img/desert-mountains.jpg':
			return sendFile(
				res,
				200,
				'image/jpg',
				'./site/desert-mountains.jpg'
			)	
		case '/styles.css':
			return sendFile(
				res,
				200,
				'image/jpg',
				'./site/styles.css'
			)	
		default:
			return sendFile(
				res,
				404,
				'text/html',
				'./site/404.html'
			)									
	}
}).listen(3000);

console.log('server at 3000');