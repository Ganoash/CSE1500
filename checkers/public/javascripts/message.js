(function(exports){
    /*client to server: game is complete and won by: */
    exports.T_GAME_WON_BY = "GAME-WON-BY";
    exports.O_GAME_WON_BY ={
        type: exports.T_GAME_WON_BY,
        data: null
    };
    /*Server to client: game is aborted */
    exports.O_GAME_ABORTED = {
        type: "GAME-ABORTED"
    }
    exports.S_GAME_ABORTED = JSON.stringify(exports.O_GAME_ABORTED);
    
    /*Server to Client: your turn*/
    exports.T_YOUR_TURN ="YOUR-TURN";
    exports.O_YOUR_TURN= {
        type: exports.T_YOUR_TURN
    };
    exports.S_YOUR_TURN = JSON.stringify(exports.O_YOUR_TURN);
    exports.T_SET_PLAYER = "SET-PLAYER";
    /*Server to Client: Set Player 1*/
    exports.O_SET_PLAYER_1= {
        type: exports.T_SET_PLAYER,
        data: 1
    }
    exports.S_SET_PLAYER_1 = JSON.stringify(exports.O_SET_PLAYER_1);

    /*Server to Client: set Player 2*/
    exports.O_SET_PLAYER_2= {
        type: exports.T_SET_PLAYER,
        data: 2
    }
    exports.S_SET_PLAYER_2 = JSON.stringify(exports.O_SET_PLAYER_2);

    /*Player to server or server to player: this move was made*/
    exports.T_MOVE_MADE= "MOVE-MADE";
    exports.O_MOVE_MADE= {
        type: exports.T_MOVE_MADE,
        data: null
    }

    /*Player to server: list of legal moves*/
    exports.T_LEGAL_MOVES = "LEGAL_MOVES";
    exports.O_LEGAL_MOVES = {
        type: exports.T_LEGAL_MOVES,
        data: null
    }

    exports.T_GAME_OVER = "GAME_OVER"
    exports.O_GAME_OVER = {
        type: exports.T_GAME_OVER,
        data: null
    }

})(typeof exports === "undefined" ? this.Messages = {} : exports);