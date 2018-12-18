
var express = require('express');
var http = require('http');
var websocket = require('ws');
var messages = require("./public/javascripts/message.js")
var Game = require("./Game");
var Stats = require("./gameStats");

var app = express();
const port = process.argv[2];

//use static files
app.use(express.static(__dirname + "/public"))
//give index
app.get("/", function(req, res){
  res.sendFile("splash.html", {root: "./public"});
});

app.get("/play", function(req,res){
  res.sendFile("game.html", {root: "./public"});
})

app.get("/statistics", function(req, res){
  res.json(Stats);
})

var server = http.createServer(app);
const wss = new websocket.Server({server});

var websocket = {};
var connectionid = 0;
var currGame = new Game(Stats.gamesStarted++);

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
  console.log(player)
  websocket[con.id] = currGame;
  var isPlayer1 = (con === currGame.player1)
  con.send((player == "1") ? messages.S_SET_PLAYER_1 : messages.S_SET_PLAYER_2);
  if(currGame.hasTwoConnectedPlayers()){
    currGame.player1.send(messages.S_YOUR_TURN);
    currGame = new Game(connectionid++);
  }
  con.on("message", function incoming(message){
    var oMSG = JSON.parse(message);
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
  con.on("close", function(code){
    var gameObj = websocket[con.id];
    if(code == "1001"){
      if(gameObj.isValidTransition(gameObj.gameState, "ABORTED")){
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
