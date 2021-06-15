const express = require('express');
const app = express();
//const config = require('./config');
const dimoco = require("@mrnicegyu11/dimocopayment");

// Body Parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/', (req, res) => res.status(200).json({ error: false, message: 'Hi there!' }));

// Handle the web hook
app.post('/webhook', (req, res) => {
    //if (req.headers['Authorization'] != config.authorization) return res.status(401).json({ error: true, messgae: 'Icorrect authorization token' });
    console.log(req.body);
    const webhookData = dimoco.processWebhook(req.body,"KPaR2jeR");
    console.log(webhookData);
    res.status(200).json({ error: true, message: 'Success' });
});

// Route not found
app.use('*', (req, res) => res.status(400).json({ error: true, message: 'The requested endpoint could not be found' }));
const webPort = 42004;
// Listen the server
app.listen(webPort, () => {
    console.log('Server listening on port: ' + webPort.toString());
});
