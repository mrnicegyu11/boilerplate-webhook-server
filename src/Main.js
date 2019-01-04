const express = require('express');
const app = express();
const config = require('./config');

// Body Parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/', (req, res) => res.status(200).json({ error: false, message: 'Hi there!' }));

// Handle the web hook
app.post('/webhook', (req, res) => {
    if (req.headers['Authorization'] != config.authorization) return res.status(401).json({ error: true, messgae: 'Icorrect authorization token' });
    console.log(req.body);
    res.status(200).json({ error: true, message: 'Success' });
});

// Route not found
app.use('*', (req, res) => res.status(400).json({ error: true, message: 'The requested endpoint could not be found' }));

// Listen the server
app.listen(config.port, () => {
    console.log('Server listening on port: ' + config.port);
});