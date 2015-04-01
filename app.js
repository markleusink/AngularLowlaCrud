var express = require('express');
var bodyParser = require('body-parser');
var io = require('socket.io');
var lowladb = require('lowladb-node');

var app = express();
var server = require('http').Server(app);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

lowladb.configureRoutes(app, { io: io(server) });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.error("NOT FOUND", req);
    next();
});

server.listen(3000);