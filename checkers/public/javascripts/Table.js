/* funtion for creating a 2D array*/
function twoDarray(x, y) {
    "use strict";
    var ret = [], i;
    for (i = 0; i < x; i + 1) {
        ret.push(new Array(y));
    }
    return ret;
}

/* function for reducing an array of arrays of ... to an array of arrays */
function flatten(arr){
    "use strict";
    arr.forEach(function(element){
        if(Array.isArray(element)){
            element.forEach(function(element2){
                arr.push(element2);
                arr.splice(arr.indexOf(element), 1);
                flatten(element);
            });
        }
    });
}

var start = function (){
    "use strict";
    var ret = twoDarray(8, 8), i, j;
    /*initialising the array for the start values */
    for (i = 0; i <= 7; i + 1) {
        for (j = 0; j <= 7; j + 1) {
            if ((i + j) % 2 === 1) {
                start[i][j] = -1;
            } else if (i <= 2) {
                start[i][j] = 1;
            } else if (i >= 5) {
                start[i][j] = 2;
            } else {
                start[i][j] = 0;
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
//function for determining wether a entry has legal moves
Entry.prototype.legalMoves = function () {
    "use strict";
    var ret = new Array(1);
    ret[0] = 0;
    if (this.legalHits(this.value).length === 0) {
        if (this.pointers[0] === 0) {
            ret.push(this.pointers[0]);
        }
        if (this.pointers[1] === 0) {
            ret.push(this.pointers[1]);
        }
    } else {
        ret[0] = 1;
        ret = flatten(this.legalHits(this.value));
    }
    return ret;
};

Entry.prototype.legalHits = function (value) {
    "use strict";
    var ret = [], n;
    for (n = 0; n <= 1; n + 1) {
        if (this.pointers[n] !== 0 && this.pointers[n] !== value) {
            if (this.pointers[n].pointers[n] !== null && this.pointers[n].pointers[n] === 0) {
                ret.push(this.pointers[n].pointers[n]);
                if (this.pointers[n].pointers[n].legalHits(value).length > 0) {
                    ret.push(this.pointers[n].pointers[n].legalHits(value));
                }
            }
        }
    }
    return ret;
};
/* gameobject for the table itself, and performing calculations to determine legal moves*/
var Table = (function (PlayerId) {
    "use strict";
    this.board = twoDarray(8, 8);
    this.id = PlayerId;
    //initialising the board and entry pointers
    var i, j;
    for (i = 0; i <= 7; i + 1) {
        for (j = 0; j <= 7;  j + 1) {
            if (start()[i][j] >= 0) {
                this.board[i][j] = new Entry(i, j, start()[i][j]);
                if (i - 1 >= 0 && j - 1 >= 0) {
                    this.board[i][j].setPointer(0, this.board[i - 1][j - 1]);
                } else {
                    this.board[i][j].setPointer(0, null);
                }
                if (i - 1 >= 0 && j + 1 <= 7) {
                    this.board[i][j].setPointer(1, this.board[i - 1][j + 1]);
                } else {
                    this.board[i][j].setPointer(1, null);
                }
                if (i + 1 <= 7 && j - 1 >= 0) {
                    this.board[i][j].setPointer(2, this.board[i + 1][j - 1]);
                } else {
                    this.board[i][j].setPointer(2, null);
                }
                if (i + 1 <= 7 && j + 1 <= 7) {
                    this.board[i][j].setPointer(3, this.board[i + 1][j + 1]);
                } else {
                    this.board[i][j].setPointer(3, null);
                }
            } else {
                this.board[i][j] = null;
            }
        }
    }

    return {
        //function that returns an array with all entries with legal moves
        legallist: function () {
            var hitlist = [], movelist = [];
            this.board.forEach(function (element) {
                element.forEach(function (entry) {
                    if (entry !== null && entry.getValue() === this.id) {
                        if (entry.legalMoves()[0].length > 1) {
                            if (entry.legalMoves()[0] === 0) {
                                movelist.push(entry);
                            }
                            if (entry.legalMoves()[0] === 1) {
                                hitlist.push(entry);
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
            entry.setValue = 0;
            location.setValue = this.id;
        },
        capture: function (entry, location){
            entry.setValue = 0;
            var i;
            if(!Array.isArray(location)){
                location = [location];
            }
            for(i = 0; i < location.length; i++){
                this.table[(entry.getRow() + location[i].getRow()) / 2][(entry.getCollumn() + location[i].getCollumn()) / 2].value = 0;
                entry = location[i];
            }
            entry.value = this.id;
        }
    };
})(1);