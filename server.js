var express = require('express');
var app = express();
var morgan = require('morgan');
var router = express.Router();
var bodyParser = require('body-parser');
// var apiRoutes = require('./routes/rotues');
const path = require('path');
var html=require('html');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'files/download')));


// app.use(bodyParser.urlencoded({ extened:false }));
// app.use(bodyParser.json());

app.use(function(req,res,next){
	console.log('Time : '+Date.now());
	console.log(req.originalUrl);
	next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// app.use('/', apiRoutes);
// app.use('/api', api);



//define port number to operate eather 5000 or port number define through 
// evn file
var port = process.env.PORT || 5000;


app.listen(port)
console.log('server is listning on :'+port);

router.get('/',function(req,res,next){
	//res.sendFile(path.join(__dirname,'../views','index.html'));
	// res.send('Welcome to unicode translator');
	res.sendfile('build/index.html'); //view
});

