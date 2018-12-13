
var express = require('express');
var http = require('http');
var websocket = require('ws');
var messages = require("./public/javascripts/message.js")

var app = express();
const port = process.argv[2];

//use static files
app.use(express.static(__dirname + "/public"))
//give index
app.get("/", function(req, res){
  res.sendFile("game.html", {root: "./public"});
});

var server = http.createServer(app);
const wss = new websocket.Server({server});

var websocket = {};

setInterval(function(){
  for(let i in websocket){
    if(websocket.hasOwnProperty(i)){
      let obj = websocket[i];

      if(obj.finalSatus = null){
        delete websocket[i];
      }
    }
  }
}, 50000);

wss.on("connection", function(ws){

});
server.listen(port);
