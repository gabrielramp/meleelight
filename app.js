var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;

app.use(express.static('./dist'));

app.get('/', function(req, res) {
  res.redirect('/meleelight.html');
});

app.set('port', (process.env.PORT || 5000));

var server = app.listen(app.get('port'), function() {
  console.log('Server listening on port:', app.get('port'));
});

var options = {
  debug: true
};

app.use('/peerjs', ExpressPeerServer(server, options));

var connected = [];

server.on('connection', function (id) {
  var idx = connected.indexOf(id);
  if (idx === -1) {
    console.log("peer connected" + id);
    connected.push(id);
  }
});

server.on('disconnect', function (id) {
  var idx = connected.indexOf(id);
  if (idx !== -1) {
    console.log("peer disconnected" + id);
    connected.splice(idx, 1);
  }
});

app.get('/connected-people', function (req, res) {
  return res.json(connected);
});
