var Stats = require("./gameStats.js");

var game = function(gameId){
    this.id = gameId;
    this.player1 = null;
    this.player2 = null;
    this.gameState = "0 JOINT";
}

game.prototype.transitionStates = {};
game.prototype.transitionStates["0 JOINT"] = 0;
game.prototype.transitionStates["1 JOINT"] = 1;
game.prototype.transitionStates["2 JOINT"] = 2;
game.prototype.transitionStates["1 MOVE"] = 3;
game.prototype.transitionStates["2 MOVE"]= 4
game.prototype.transitionStates["1"] = 5; //1 won
game.prototype.transitionStates["2"] = 6; //2 won
game.prototype.transitionStates["ABORTED"] = 7;

game.prototype.transitionMatrix = [
    [0, 1, 0, 0, 0, 0, 0, 0],   //0 JOINT
    [1, 0, 1, 0, 0, 0, 0, 0],   //1 JOINT
    [0, 0, 0, 1, 0, 0, 0, 1],   //2 JOINT (note: once we have two players, there is no way back!)
    [0, 0, 0, 1, 0, 1, 0, 1],   //1 to move
    [0, 0, 0, 0, 1, 0, 1, 1],   //2 to move 
    [0, 0, 0, 0, 0, 0, 0, 0],   //1 WON
    [0, 0, 0, 0, 0, 0, 0, 0],   //2 WON
    [0, 0, 0, 0, 0, 0, 0, 0]    //ABORTED
];

game.prototype.isValidTransition = function(from, to){
    let i,j;
    if(!(from in (this.transitionStates))|| !(to in (this.transitionStates))){
        return false;
    }
    else{
        console.log(from, to)
        i= this.transitionStates[from];
        j= this.transitionStates[to];
    }
    return (game.prototype.transitionMatrix[i][j] > 0);
}
game.prototype.isValidState = function(s){
    return s in this.transitionStates
}
game.prototype.setState = function(w){
    if(this.isValidState(w)&&this.isValidState(this.gameState, w)){
        this.gameState = w;
    }
    else{
        return new Error("impossible to change status", this.gameState);
    }
    if(w == "1"|| w=="2"){
        Stats.gamesCompleted++;
    } else if(w == "ABORTED"){
        Stats.gamesAbolished++;
    }
}

game.prototype.addPlayer = function(p){
    if(this.gameState !== "0 JOINT" && this.gameState !== "1 JOINT"){
        return Error("invalid call to addPlayer")
    }

    if(this.gameState === "0 JOINT"){
        this.setState("1 JOINT")
    }else{
        this.setState("2 JOINT")
    }
    if(this.player1 == null){
        this.player1= p;
        console.log("player 1");
        return "1";
    }
    else{
        this.player2 = p;
        console.log("player 2")
        return "2";
    }
}

game.prototype.hasTwoConnectedPlayers = function(){
    if(this.player1 !== null && this.player2 !== null){
        return true
    }
    return false;
}
module.exports = game;