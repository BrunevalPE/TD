const express = require('express');
const app = express();

app.use('/src', express.static(__dirname + '/src/'));
app.use('/images', express.static(__dirname + '/images'));
app.get('/', function(req, res) {
    res.sendFile('./index.html', { root: __dirname });
});
const port = process.env.PORT || 8888;
app.listen(port, function() {
    console.log('Example app listening on port' + port);
});
