const express = require('express');
const app = express();

app.use('/src', express.static(__dirname + '/src/'));
app.use('/images', express.static(__dirname + '/images'));
app.get('/', function(req, res) {
    res.sendFile('./index.html', { root: __dirname });
});

app.listen(8888, function() {
    console.log('Example app listening on port 8888!');
});
