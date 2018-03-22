var express = require('express');
var app = express();
var path = require('path');


app.use('/publics',express.static('publics'))
app.use('/mdbootstrap', express.static(__dirname + '/node_modules/mdbootstrap'));


var bodyParser = require('body-parser');
app.use(bodyParser.json());     // to support JSON-encoded bodies // parse application/json
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));


var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({secret: "tthhaaiivvaann"}));


// ประกาศให้ Express ใช้งาน View โดยให้ใช้โฟลเดอร์ views เป็นตัวเก็บไฟล์ jade
app.set('views', path.join(__dirname, 'views'));
// ตั้งค่าให้ Express ใช้ View Engine ชื่อว่า Jade
app.set('view engine', 'jade');


var con = require('./controllers/controllers.js');
app.use(con);


app.listen(3000);