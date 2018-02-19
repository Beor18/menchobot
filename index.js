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

//Verificamos token
app.get('/webhook', (req, res) => {

  let VERIFY_TOKEN = "<EAAEZBSgLMwiUBAGUFfHzkUgcUV56ENElxkm3PaflY3dVjonFe3mu1e0K1LHCZACpZAjeyvoFHZCB5sQZAlnZAFBCqJjtZAKQZCHGeaZBy6ZChvaknKxv8FJzXt4ZAB4g9W3zCZAOveuR2RKb2RfNVknTEZCijmOA91XhGbKZAA4mL4q65F0AZDZD>"
    
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  if (mode && token) {
  
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      res.sendStatus(403);      
    }
  }
});