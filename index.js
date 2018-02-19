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