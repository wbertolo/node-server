import express from "express";
import skiTerms from "./ski-terms.json" assert {type: "json"};
import bodyParser from "body-parser";
import fs from "fs";

const app = express();


app.use('/', express.static('./client'));
app.get('/dictionary', (req, res) => {
	res.json(definitions);
})

let definitions = skiTerms;

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  if (Object.keys(req.body).length) {
    console.log(req.body);
  }
  next();
});

app.post('/dictionary', bodyParser.json(), (req, res) => {
	definitions.push(req.body);
	save();
	res.json({
		status: 'success', 
		term: req.body
	})
})

app.delete('/dictionary/:term', (req, res) => {
	definitions = definitions.filter(({ term }) => term !== req.params.term);
	console.log(definitions);
	save();
	res.json({
		status: 'sucess',
		removed: req.params.term,
		newLength: definitions.length
	});
});



const save = () => {
	fs.writeFile('./ski-terms.json', JSON.stringify(definitions, null, 2), 
	(err) => {
		if (err) {
			throw err;
		}
	})
}

app.listen(3000, () => console.log('running'));