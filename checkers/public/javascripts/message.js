(function(exports){
    /*client to server: game is complete and won by: */
    exports.T_GAME_WON_BY = "GAME-WON-BY";
    exports.O_GAME_WON_BY ={
        type: exports.T_GAME_WON_BY,
        data: null
    };
    /*Server to client: game is aboretd */
    exports.O_GAME_ABORTED = {
        type: "GAME-ABORTED"
    }
    exports.S_GAME_ABORTED = JSON.stringify(O_GAME_ABORTED);
    
    /*Server to Client: your turn*/
    exports.O_YOUR_TURN= {
        type: "YOUR-TURN"
    };
    exports.S_YOUR_TURN = JSON.stringify(O_YOUR_TURN);

    /*Server to Client: Set Player 1*/
    exports.O_SET_PLAYER_1= {
        type: "SET-PLAYER",
        data: 1
    }
    exports.S_SET_PLAYER_1 = JSON.stringify(O_SET_PLAYER_1);

    /*Server to Client: set Player 2*/
    exports.O_SET_PLAYER_2= {
        type: "SET-PLAYER",
        data: 2
    }
    exports.S_SET_PLAYER_2 = JSON.stringify(O_SET_PLAYER_2);

    /*Player to server or server to player: this move was made*/
    exports.T_MOVE_MADE= "MOVE-MADE";
    exports.O_MOVE_MADE= {
        type: exports.T_MOVE_MADE,
        data: null,
        player: null
    }

    /*Player to server: list of legal moves*/
    exports.T_LEGAL_MOVES = "LEGAL_MOVES";
    exports.O_LEGAL_MOVES = {
        type: T_LEGAL_MOVES,
        data: null
    }

    exports.T_GAME_OVER = "GAME_OVER"
    exports.O_GAME_OVER = {
        type: exports.T_GAME_OVER,
        data: null
    }

})(typeof exports === "undefined" ? this.Messages = {} : exports);