var express = require('express'),
bodyParser = require('body-parser'),
app = express();
//mysql = require('mysql');

//var db = require('./config/db.js');
//global.connection = mysql.createConnection(db);



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());



//controller
require('./routes.js')(app);

var server1 = app.listen('8000','localhost',function(){
	console.log('connected',server1.address());
});