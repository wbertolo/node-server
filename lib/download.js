const https = require("https");
const fs = require("fs");

const url = "https://en.wikipedia.org/wiki/Kamelot"
// const options = {
// 	hostname: 'en.wikipedia.org',
// 	port: 443,
// 	path: '/wiki/Kamelot',
// 	method: 'GET'
// }

const request = https.get (url, (res) => {
	let download = fs.createWriteStream('kamelot2.html');
	console.log('response started');
	res.pipe(download);
	res.on('end', ()=> {
		console.log('response finished');
	});
});

request.end();