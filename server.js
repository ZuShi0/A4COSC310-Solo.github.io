const express = require('express');
const path = require('path');
const server = express();

server.use('/', express.static(path.join('site')));

server.listen(4000, () => {
    console.log('server running...');
});