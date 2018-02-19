// Creamos servidor

'use strict';

const
	express = require('express'),
	bodyParser = require('body-parser'),
	app = express().use(bodyParser.json()); // creamos express server

app.listen(process.env.PORT || 1337, () => console.log('webhook funciona!'));

app.post('/webhook', (req, res) => {
	let body = req.body;

	if (body.object === 'page') {
		body.entry.forEach(function(entry){
			let webhook_event = entry.messaging[0];
			console.log(webhook_event);
		});

		res.status(200).send('EVENT_RECEIVED');
	}else {
		res.sendStatus(404);
	}
});

app.get('/webhook/', (req, res) => {
	
	//agregamos token para verificar
	let VERIFY_TOKEN = "<EAAEZBSgLMwiUBAKOCDL4o3HkDJy7jCz9GHZCvMEwrEOviKoHD3fBinTG0hFeZAtYeZA5lRZCZAOZC7NKh8jnaj6w4Qa9Ecui3K6MoDdZCMeoIzHvYidz9gJuGYTgZCLOkQIoFfOADMf1WKoQI8ZB25eiKDjTNXYGc3AnrkowLuAIKZBogZDZD>"

	let mode = req.query['hub.mode'];
	let token = req.query['hub.verify_token'];
	let challenge = req.query['hub.challenge'];


	if (mode && token){
		if (mode === 'subscribe' && token === VERIFY_TOKEN) {
			console.log('WEBHOOK_VERIFIED');
			res.status(200).send(challenge);
		} else {
			res.sendStatus(403);
		}
	}
});