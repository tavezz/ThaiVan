var express = require('express');
var app = express();
var con = require('./controllers/controllers.js');


//var con = require('./controllers/controllers.js');
app.use(express.static(__dirname + '/public'));

app.use(require('./controllers/controllers.js'));
//app.use('/', con);






app.listen(3000);