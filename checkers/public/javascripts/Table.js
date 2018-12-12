$(document).ready(function(){
    function treeify(arr){
        ret = [];
        arr.forEach(function(element){
            if(Array.isArray(element)){
                element.forEach(function(entry){
                    ret.push([arr[0], entry])
                });
            }
        });
        return ret;
    }
    /* funtion for creating a 2D array*/
    function twoDarray(x, y) {
        "use strict";
        //console.log("2D array started");
        var ret = [], i, j;
        for (i = 0; i < x; i++) {
            var temp = []
            for(j = 0; j < y; j++){
                temp.push();
            }
            ret.push(temp);
        }
        return ret;
    }

    var start = function (){
        "use strict";
        var ret = twoDarray(8, 8), i, j;
        /*initialising the array for the start values */
        for (i = 0; i <= 7; i++) {
            for (j = 0; j <= 7; j++) {
                if ((i + j) % 2 === 1) {
                    ret[i][j] = -1;
                } else if (i <= 2) {
                    ret[i][j] = 1;
                } else if (i >= 5) {
                    ret[i][j] = 2;
                } else {
                    ret[i][j] = 0;
                }
            }
        }
        return ret;
    }
    /* Javascript object covering the entries in the table */
    function Entry(row, collumn, value) {
        "use strict";
        this.collumn = collumn;
        this.row = row;
        this.value = value;
        this.pointers = new Array(4);
    }
    Entry.prototype.getCollumn = function () {"use strict"; return this.collumn; };
    Entry.prototype.getRow = function () {"use strict"; return this.row; };
    Entry.prototype.getValue = function () {"use strict"; return this.value; };
    Entry.prototype.setValue = function (value) {"use strict"; this.value = value; };
    Entry.prototype.setPointer = function (index, pointer) {"use strict"; this.pointers[index] = pointer; };
    Entry.prototype.getPointer = function (index) {"use strict"; return this.pointers[index]; };
    //function for determining wether an entry has legal moves
    Entry.prototype.legalMoves = function (id) {
        "use strict";
        //console.log("legalMoves called");
        var ret = new Array(1),s;
        ret[0] = 0;
        if(id==1){
            s = 2;
        }
        else{
            s = 0;
        }
        if (this.legalHits(this.value).length === 0) {
            if (this.getPointer(0+s) != null && this.getPointer(0+s).getValue() === 0) {
                ret.push(this.getPointer(0+s));
            }
            if (this.getPointer(1+s) != null && this.getPointer(1+s).getValue() === 0) {
                ret.push(this.getPointer(1+s));
            }
        } else {
            //console.log("HIT")
            ret[0] = 1;
            ret = ret.concat(this.legalHits(this.value));

        }
        return ret;
    };
    //function for determining wether an entry has legal captures
    Entry.prototype.legalHits = function (value) {
        "use strict";
        var ret = [], n,s=0;
        if(value == 1){
            s=2;
        }
        for (n = 0+s; n <= 1+s; n++) {
            //console.log(n, this, this.getValue(), value, 0)
            if (this.getPointer(n) != null && this.getPointer(n).getValue() !== 0 && this.getPointer(n).getValue() !== value) {
                //console.log(n, this.getPointer(n), this.getPointer(n).getValue(), 1)
                if (this.getPointer(n).getPointer(n) !== null && this.getPointer(n).getPointer(n).value === 0) {
                    //console.log(n, this.getPointer(n).getPointer(n), this.getPointer(n).getPointer(n).getValue(), 2);
                    //push the piece end position on the array
                    ret.push(this.getPointer(n).getPointer(n));
                    //console.log(ret, ret.length)
                    //check if a second piece can be captured if so push that end location on the array
                    if (this.getPointer(n).getPointer(n).legalHits(value).length > 0) {
                        var temp =[];
                        temp.push(this.getPointer(n).getPointer(n));
                        temp.push(this.getPointer(n).getPointer(n).legalHits(value))
                        temp = treeify(temp)
                        ret.push(temp);
                    }
                }
            }
        }
        //console.log("final:", ret, ret.length);
        return ret;
    };
    /* gameobject for the table itself, and performing calculations to determine legal moves*/
    var Table = (function (PlayerId) {
        "use strict";
        var board = twoDarray(8, 8);
        var id = PlayerId;
        //initialising the board and entry pointers
        var i, j;
        for (i = 0; i <= 7; i++) {
            for (j = 0; j <= 7;  j++) {
                if (start()[i][j] >= 0) {
                    board[i][j] = new Entry(i, j, start()[i][j]);
                } else {
                    board[i][j] = null;
                }
            }
        }
        var i, j;
        for (i = 0; i <= 7; i++) {
            for (j = 0; j <= 7;  j++) {
                if (start()[i][j] >= 0) {
                    if (i - 1 >= 0 && j - 1 >= 0) {
                        board[i][j].setPointer(0, board[i - 1][j - 1]);
                    } else {
                        board[i][j].setPointer(0, null);
                    }
                    if (i - 1 >= 0 && j + 1<= 7) {
                        board[i][j].setPointer(1, board[i - 1][j + 1]);
                    } else {
                        board[i][j].setPointer(1, null);
                    }
                    if (i + 1 <= 7 && j - 1 >= 0) {
                        board[i][j].setPointer(2, board[i + 1][j - 1]);
                    } else {
                        board[i][j].setPointer(2, null);
                    }
                    if (i + 1<= 7 && j + 1<= 7) {
                        board[i][j].setPointer(3, board[i + 1][j + 1]);
                    } else {
                        board[i][j].setPointer(3, null);
                    }
                } else {
                    board[i][j] = null;
                }
            }
        }
        //console.log(board);
        return {
            //function that returns an array with all entries with legal moves
            legallist: function () {
                //console.log("started")
                var hitlist = [], movelist = [];
                board.forEach(function (element) {
                    element.forEach(function (entry) {
                        if (entry !== null && entry.getValue() === id) {
                            //console.log("entry accepted", entry,entry.legalMoves(id));
                            if (entry.legalMoves(id).length > 1) {
                                if (entry.legalMoves(id)[0] === 0) {
                                    movelist.push(entry);
                                    //console.log("pushed on movelist")
                                }
                                if (entry.legalMoves(id)[0] === 1) {
                                    hitlist.push(entry);
                                    //console.log("pushed on hitlist")
                                }
                            }
                        }
                    });
                });
                if (hitlist.length > 0) {
                    return hitlist;
                }
                return movelist;
            },
            move: function (entry, location) {
                entry.setValue(0);
                //console.log(entry);
                location.setValue(id);
                //console.log(board, "move started");
            },
            capture: function (entry, location){
                console.log(entry, location);
                entry.setValue(0);
                var i, route = [];
                if(!Array.isArray(location)){
                    location = [location];
                }
                location.forEach(function(element){
                    if(element instanceof Entry){
                        route.push(element);
                    }
                })

                for(i = 0; i < route.length; i++){
                    //console.log((route[i].getRow() + entry.getRow()) / 2, (route[i].getCollumn() + entry.getCollumn()) / 2);

                    board[(route[i].getRow() + entry.getRow()) / 2][(route[i].getCollumn() + entry.getCollumn()) / 2].setValue(0);
                    entry = route[i];
                }
                entry.setValue(id);
            },
            getBoard: function(){
                //console.log("Board requested");
                return board;
            },
            getId: function(){
                return id;
            }
        };
    }(2));

    function onlyUnique(arr) { 
        var ret=[];
        arr.forEach(function(elements){
            if(ret.indexOf(elements) == -1){
                ret.push(elements);
            }
        })
        return ret;
    }

    function flatten(arr) {
        var ret = [];
        arr.forEach(function(element){
            if(Array.isArray(element)){
                ret= ret.concat(flatten(element));
            }
            else{
                ret.push(element);
            }
        });
        return ret;
    }
    function determinelast(arr, entry){
        var i;
        console.log(arr.indexOf(entry), entry, "began")
        if(arr.indexOf(entry)!==(arr.length-1)){
            for(i = 0; i < arr.length; i++){
                if(Array.isArray(arr[i])){
                    console.log(arr[i], "recursion");
                    return determinelast(arr[i], entry);
                }
            }
        }
        else{
            console.log(arr, "returned");
            return arr;
        }
    }
    function getTable(){
        //console.log("table requested");
        var table = twoDarray(8,8), i, j;
        for(i = 0; i <= 7; i++){
            for(j = 0; j <= 7; j++){
            table[i][j] = $("tr.row"+(i+1)).find("#"+(j+1));
            }
        }
        return table;
    }
    function updatetable(){
        //console.log("update started");
        var table = getTable();
        var board = Table.getBoard();
        for(i = 0; i <= 7; i++){
            for(j = 0; j <= 7; j++){
            if(board[i][j] != null){
                table[i][j].off()
                switch(board[i][j].getValue()){
                    case 0: 
                    table[i][j].empty();
                    table[i][j].append("<br>");
                    break;
                    case 1:
                    table[i][j].empty();
                    table[i][j].append("<img src ='../public/images/untitled.png'>");
                    break;
                    case 2:
                    table[i][j].empty();
                    table[i][j].append("<img src ='../public/images/checkers black.png'>");
                    break;
                }
            }
            }
        }
        hlLegalpiece();
    }

    function hlLegalpiece(){
        var table = getTable(), legalPieces = Table.legallist(), board = Table.getBoard();
       // console.log(Table.legallist());
        legalPieces.forEach(function(element){
            switch(board[element.getRow()][element.getCollumn()].getValue()){
                case 1:
                table[element.getRow()][element.getCollumn()].empty();
                table[element.getRow()][element.getCollumn()].append("<img src = '../public/images/Checkers red legal.png'>");
                break;
                case 2:
                table[element.getRow()][element.getCollumn()].empty();
                table[element.getRow()][element.getCollumn()].append("<img src = '../public/images/Checkers Black legal.png'>");
                break;
            }
            table[element.getRow()][element.getCollumn()].on("click",{
                element: element
            }, showMoves);
    });
}

    function showMoves(event){
        var table = getTable(), highlight = event.data.element.legalMoves(Table.getId());
        highlight = flatten(highlight);
        console.log("Flattend:",highlight);
        highlight = onlyUnique(highlight);
       // console.log(highlight);
        highlight.forEach(function(entry){
            if(entry instanceof Entry){
           // console.log(entry);
            table[entry.getRow()][entry.getCollumn()].empty();
            table[entry.getRow()][entry.getCollumn()].append("<img src = '../public/images/legal.png'>");
            table[entry.getRow()][entry.getCollumn()].on("click",{
                element: event.data.element,
                entry: entry
            }, move);
            table[event.data.element.getRow()][event.data.element.getCollumn()].off("click", showMoves);
            table[event.data.element.getRow()][event.data.element.getCollumn()].on("click",{
                element: event.data.element
            }, hideMoves);

    }
});
}   
    function hideMoves(event){
        var table = getTable(), highlight = event.data.element.legalMoves(Table.getId());
        highlight = flatten(highlight);
        highlight = onlyUnique(highlight);
       // console.log(highlight);
        highlight.forEach(function(entry){
            if(entry instanceof Entry){
           // console.log(entry);
            table[entry.getRow()][entry.getCollumn()].empty();
            table[entry.getRow()][entry.getCollumn()].append("<br>");
            table[entry.getRow()][entry.getCollumn()].off("click", move);
            table[event.data.element.getRow()][event.data.element.getCollumn()].on("click",{
                element: event.data.element
            }, showMoves);
            table[event.data.element.getRow()][event.data.element.getCollumn()].off("click", hideMoves);
            }
        });
    }

    function move(event){
        console.log(event.data.element.legalMoves(Table.getId()).indexOf(event.data.entry)===(-1));
        if(event.data.element.legalMoves(Table.getId()).indexOf(event.data.entry)===(-1)){
        var path = determinelast(event.data.element.legalMoves(Table.getId()), event.data.entry);
        } else {
            path = [event.data.entry];
        }
        console.log(event.data.element.legalMoves(Table.getId()), path, event.data.entry);
        if(event.data.element.legalMoves(Table.getId())[0] === 0){
           // console.log("you rule")
            Table.move(event.data.element, event.data.entry);
        } else{
            console.log("hit run")
            Table.capture(event.data.element, path);
        }
        updatetable();
    };
    updatetable();
})
