var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var port = process.argv[2];
app.use(express.static(__dirname + "/public"))
app.get("/", function(req, res){
  res.sendFile("game.html", {root: "./public"});
});

http.createServer(app).listen(port);

module.exports = app;
