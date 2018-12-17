
var express = require('express');
var http = require('http');
var websocket = require('ws');
var messages = require("./public/javascripts/message.js")
var Game = require("./Game");

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
var connectionid = 0;
var currGame = new Game();

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
  var con = ws;
  con.id = connectionid++;
  player = currGame.addPlayer(con);
  websocket[con.id] = currGame;

  con.send((player == "1") ? messages.S_SET_PLAYER_1 : messages.S_SET_PLAYER_2);
  console.log(player)
  if(currGame.hasTwoConnectedPlayers()){
    currGame = new game();
    if(player == "1"){
      con.send(messages.S_YOUR_TURN);
    }
  }
  wss.on("message", function incoming(message){
    var oMSG = JSON.parse(message);
    var isPlayer1 = (player == "1");
    var gameObj = websocket[con.id];
    if(isPlayer1){
      if(oMSG.type === messages.T_MOVE_MADE){
        gameObj.player2.send(message);
        gameObj.setState("2 MOVE");
      }
      if(oMSG.type === messages.T_GAME_WON_BY){
        gameObj.setState("1");
        var msg = messages.O_GAME_OVER
        msg.data = "1"
        gameObj.player1.send(msg);
        gameObj.player2.send(msg);
        gameObj.finalSatus = "1";
      }

    }
    else{
      if(oMSG.type === messages.T_MOVE_MADE){
        gameObj.player1.send(message);
        gameObj.setState("1 MOVE");
      }
      if(oMSG.type === messages.T_GAME_WON_BY){
        gameObj.setState("2");
        var msg = messages.O_GAME_OVER
        msg.data = "2"
        gameObj.player1.send(msg);
        gameObj.player2.send(msg);
        gameObj.finalSatus = "2";
      }
    }
  })
  wss.on("close", function(code){
    var gameObj = websocket[con.id];
    if(code == "1001"){
      if(gameObj.isValidTransition("ABORTED")){
        gameObj.setState("ABORTED");
      }
    }
    try{
      gameObj.player1.close();
      gameObj.player1 = null;
    }catch(e){

    }
    try{
      gameObj.player2.close();
      gameObj.player2 = null;
    }catch(e){
      
    }
    gameObj.finalSatus = "3";
  });

});



server.listen(port);
