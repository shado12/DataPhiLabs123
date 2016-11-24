// server.js

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var db = require('./db');
db.initialize();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'API for DataPhi' });   
});

router.get('/patients', function(req, res) {
  db.getPatients(function(rows){
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ data	: rows }));
  });
});

router.post('/info', function(req, res) {
  var data = {};
  data.firstname = req.body.firstname;
  data.lastname = req.body.lastname;
  data.dob = req.body.dob;
  data.gender = req.body.gender;
  data.phone = req.body.phone;
  db.insertData(data);
  res.end('yes');
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

