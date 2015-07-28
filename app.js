var http = require('http');
var mongoose = require('mongoose');
var config = require('./config');
var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer');
var AUTH = 123;

app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json({
  type: 'application/*+json'
}))

var db = mongoose.connection;
mongoose.connect(config.mongo_uri);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  console.log("We've connected!!");
});

var userSchema = mongoose.Schema({
  userID: String,
  parkingDuration: Number,
  timeParked: String
});

var User = mongoose.model('User', userSchema);

// GET Homepage
app.get('/', function(req, res) {
  console.log("GET received.");
  res.status(200).send("<b>Parking DB!</b>");
});

app.post('/test', function(req, res) {
  var data = {
    "name": "Antony",
    "id": 123
  };
  res.status(200).send(data);
});

// Adds user to the db if he or she is new. Else, updates their current info.
app.post('/adduser', function(req, res) {
  if (parseInt(req.headers.auth) === AUTH) {
    var query = User.where({
      "userID": req.headers.userid
    });
    query.findOne(function(err, user) {
      if (err) {
        console.log(err);
        res.end();
      } else if (user) { // Found something...
        console.log("user's parked time was: " + user.timeParked);
        User.update({
          userID: req.headers.userid
        }, {
          $set: {
            parkingDuration: req.headers.parkingduration,
            timeParked: req.headers.timeparked
          }
        }, {
          upsert: true
        }, function(err) {
          if (!err) {
            console.log("User " + req.headers.userid + " updated!");
            res.end();
          }
        });
      } else { // New user..
        var newUser = new User({
          userID: req.headers.userid,
          timeParked: req.headers.timeparked,
          parkingDuration: req.headers.parkingduration
        });
        newUser.save(function(err, newUser) {
          console.log("User  " + newUser.userID + " was saved!");
          res.status(200).send('Successful Save');
        });
      }
    });
  } else {
    res.status(500).send('Invalid Authorization');
  }
});

app.post('/getinfo', function(req, res) {
  if (parseInt(req.headers.auth) === AUTH) {
    var query = User.where({
      "userID": req.headers.userid
    });
    query.findOne(function(err, user) {
      if (err) {
        res.end();
      } else if (user) {
        console.log("User " + user.userID + " was found!");
        var remaining = parseDateAndCalculateTimeRemaining(user.timeParked, parseInt(user.parkingDuration));
        res.status(200).send(remaining.toString());
      }
    });
  } else {
    res.status(500).send('Invalid Authorization');
  }
});

app.listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});

/*
 * Incoming date: 2015-07-23T08:54:40 +0000
 * (timeparked + parkingDuration) - current time
 */
function parseDateAndCalculateTimeRemaining(timeParked, parkingDuration) {
	var currentDate = new Date();
  var timeParkedArr = timeParked.split(/[- : T .]/);
  var parkedDate = new Date(Date.UTC(timeParkedArr[0], timeParkedArr[1] - 1, timeParkedArr[2],
    timeParkedArr[3], timeParkedArr[4], timeParkedArr[5]));
	var parkedDateWithAddedMinutes = new Date(parkedDate.getTime() + parkingDuration * 60000);
	parkedDateWithAddedMinutes.setHours(parkedDateWithAddedMinutes.getHours()+7);
  var diffMs = (parkedDateWithAddedMinutes - currentDate);
  var diffMins = Math.floor(diffMs / 60000);
  return diffMins;
}
