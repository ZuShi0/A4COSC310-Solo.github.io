const express = require('express');
const getResponse = require('./getResponse');
const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use('/', express.static('site'));

server.post('/api/', (req, res) => {
    const input = req.body.input;
    console.log('input: ', input);
    const output = getResponse(input);
    console.log('output: ', output);
    res.json({output: output});
});

server.get('/api/idea', (req, res) => {
    const idea = getResponse.getIdea();
    res.json({idea: idea});
});

server.listen(4000, () => {
    console.log('server running...');
});