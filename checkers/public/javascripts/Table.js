
/* funtion for creating a 2D array*/
function convertToObject(board) {
	var ret = {}
	for (i = 0; i <= 7; i++) {
		var temp = [];
		for (j = 0; j <= 7; j++) {
			if (board[i][j] === null) {
				temp.push(0);
			}
			else {
				if(board[i][j].kinged){
				temp.push(board[i][j].getValue()+2);
				} else{
					temp.push(board[i][j].getValue());
				}
			}
		}
		ret[i] = temp;
	}
	ret.type = Messages.T_MOVE_MADE;
	return ret;
}
function convertFromObject(start) {
	"use strict";
	if (!Array.isArray(start)) {
		var temp = [];
		for (i in start) {
			if (i != Messages.T_MOVE_MADE) {
				temp.push(start[i])
			}
		}
	}
	var i, j, board = twoDarray(8, 8);
	for (i = 0; i <= 7; i++) {
		for (j = 0; j <= 7; j++) {
			if (start[i][j] >= 0) {
				var kinged = false;
				if(start[i][j]>=3){
					start[i][j]-=2;
					kinged = true;
				} 
				board[i][j] = new Entry(i, j, start[i][j]);
				board[i][j].kinged = kinged;

			} else {
				board[i][j] = null;
			}
		}
	}
	var i, j;
	for (i = 0; i <= 7; i++) {
		for (j = 0; j <= 7; j++) {
			if (start[i][j] >= 0) {
				if (i - 1 >= 0 && j - 1 >= 0) {
					board[i][j].setPointer(0, board[i - 1][j - 1]);
				} else {
					board[i][j].setPointer(0, null);
				}
				if (i - 1 >= 0 && j + 1 <= 7) {
					board[i][j].setPointer(1, board[i - 1][j + 1]);
				} else {
					board[i][j].setPointer(1, null);
				}
				if (i + 1 <= 7 && j - 1 >= 0) {
					board[i][j].setPointer(2, board[i + 1][j - 1]);
				} else {
					board[i][j].setPointer(2, null);
				}
				if (i + 1 <= 7 && j + 1 <= 7) {
					board[i][j].setPointer(3, board[i + 1][j + 1]);
				} else {
					board[i][j].setPointer(3, null);
				}
			} else {
				board[i][j] = null;
			}
		}

	}
	return board;
}

function twoDarray(x, y) {

	'use strict';
	//("2D array started");
	var ret = [], i, j;
	for (i = 0; i < x; i++) {
		var temp = [
		]
		for (j = 0; j < y; j++) {
			temp.push();
		}
		ret.push(temp);
	}
	return ret;
}
var start = function () {
	'use strict';
	var ret = twoDarray(8, 8), i, j;
	/*initialising the array for the start values */
	for (i = 0; i <= 7; i++) {
		for (j = 0; j <= 7; j++) {
			if ((i + j) % 2 === 1) {
				ret[i][j] = - 1;
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
}/* Javascript object covering the entries in the table */

function Entry(row, collumn, value) {
	'use strict';
	this.collumn = collumn;
	this.row = row;
	this.value = value;
	this.kinged = false;
	this.pointers = new Array(4);
}
Entry.prototype.getCollumn = function () {
	'use strict';
	return this.collumn;
};
Entry.prototype.getRow = function () {
	'use strict';
	return this.row;
};
Entry.prototype.getValue = function () {
	'use strict';
	return this.value;
};
Entry.prototype.setValue = function (value) {
	'use strict';
	this.value = value;
};
Entry.prototype.setPointer = function (index, pointer) {
	'use strict';
	this.pointers[index] = pointer;
};
Entry.prototype.getPointer = function (index) {
	'use strict';
	return this.pointers[index];
};
Entry.prototype.legalMovesKinged = function () {
	var ret = new Array(1);
	ret[0] = 0;
	if (this.legalHitsKinged(this.value).length == 0) {
		for (let i = 0; i < 4; i++) {
			if (this.getPointer(i) != null && this.getPointer(i).getValue() == 0) {
				ret.push(this.getPointer(i));
				return ret;
			}
		}
	} else {
		////("HIT")
		ret[0] = 1;
		ret = ret.concat(this.legalHitsKinged(this.value));
	}
	console.log(ret, "moves");
	return ret;
}
Entry.prototype.legalHitsKinged = function (value) {
	'use strict';
	var n, ret=[];
	for (n = 0; n <= 3; n++) {

		if (this.getPointer(n) != null && this.getPointer(n).getValue() !== 0 && this.getPointer(n).getValue() !== value) {

			if (this.getPointer(n).getPointer(n) !== null && this.getPointer(n).getPointer(n).value === 0) {

				//push the piece end position on the array
				ret.push(this.getPointer(n).getPointer(n));
				this.called = true;
				//check if a second piece can be captured if so push that end location on the array
				if (!this.getPointer(n).getPointer(n).hasOwnProperty("called") && this.getPointer(n).getPointer(n).legalHitsKinged(value).length > 0){
					console.log("called")
					for(i in this.getPointer(n).getPointer(n).legalHitsKinged(value)){
					ret.push([this.getPointer(n).getPointer(n),this.getPointer(n).getPointer(n).legalHitsKinged(value)[i]]);
					}
					this.called = undefined;
					console.log(ret,n, "end")
				}
			}
			
		}
	}
	return ret;
};
//function for determining wether an entry has legal moves
Entry.prototype.legalMoves = function (id) {
	if (!this.kinged) {
		'use strict';
		//("moves called")
		////("legalMoves called");
		var ret = new Array(1),
			s;
		ret[0] = 0;
		if (id == 1) {
			s = 2;
		}
		else {
			s = 0;
		}
		if (this.legalHits(this.value).length === 0) {
			if (this.getPointer(0 + s) != null && this.getPointer(0 + s).getValue() === 0) {
				ret.push(this.getPointer(0 + s));
			}
			if (this.getPointer(1 + s) != null && this.getPointer(1 + s).getValue() === 0) {
				ret.push(this.getPointer(1 + s));
			}
		} else {
			////("HIT")
			ret[0] = 1;
			ret = ret.concat(this.legalHits(this.value));
		}
		//(ret);
		return ret;
	} else {
		return this.legalMovesKinged();
	}
};
//function for determining wether an entry has legal captures
Entry.prototype.legalHits = function (value) {
	'use strict';
	var ret = [], n, s = 0;
	if (value == 1) {
		s = 2;
	}
	for (n = 0 + s; n <= 1 + s; n++) {
		////(n, this, this.getValue(), value, 0)
		if (this.getPointer(n) != null && this.getPointer(n).getValue() !== 0 && this.getPointer(n).getValue() !== value) {
			////(n, this.getPointer(n), this.getPointer(n).getValue(), 1)
			if (this.getPointer(n).getPointer(n) !== null && this.getPointer(n).getPointer(n).value === 0) {
				////(n, this.getPointer(n).getPointer(n), this.getPointer(n).getPointer(n).getValue(), 2);
				//push the piece end position on the array
				ret.push(this.getPointer(n).getPointer(n));
				////(ret, ret.length)
				//check if a second piece can be captured if so push that end location on the array
				if (this.getPointer(n).getPointer(n).legalHits(value).length > 0) {
					for(i in this.getPointer(n).getPointer(n).legalHitsKinged(value)){
						ret.push([this.getPointer(n).getPointer(n),this.getPointer(n).getPointer(n).legalHits(value)[i]]);
						}
				}
			}
		}
	}  ////("final:", ret, ret.length);
	if(ret.length > 0){
		console.log(ret)
		}
	return ret;
};
/* gameobject for the table itself, and performing calculations to determine legal moves*/
var Table = (function (PlayerId) {
	'use strict';

	var id = PlayerId;
	var canMove = false;
	var p1piecesCaptured = 0;
	var p2piecesCaptured = 0;
	var socket;
	var board = convertFromObject(start());
	return {
		//function that returns an array with all entries with legal moves
		legallist: function () {
			//("started")
			var hitlist = [],movelist = [];
			board.forEach(function (element) {
				element.forEach(function (entry) {
					if (entry !== null && entry.getValue() === id) {
						console.log("entry accepted", entry,entry.legalMoves(id));
						//(id)
						if (entry.legalMoves(id).length > 1) {
							if (entry.legalMoves(id)[0] === 0) {
								movelist.push(entry);
								console.log("pushed on movelist")
							}
							if (entry.legalMoves(id)[0] === 1) {
								hitlist.push(entry);
								console.log("pushed on hitlist")
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
			////(entry);
			location.setValue(id);
			if (location.getRow() == 7 || location.getRow() == 0) {
				location.kinged = true;
			}
			if (entry.kinged) {
				entry.kinged = false;
				location.kinged = true;
			}
			////(board, "move started");
			var msg = JSON.stringify(convertToObject(board));
			//(msg);
			socket.send(msg);
		},
		capture: function (entry, location) {
			//(entry, location);
			entry.setValue(0);
			var i, kinged = entry.kinged, route = [];
			entry.kinged = false;
			if (!Array.isArray(location)) {
				location = [
					location
				];
			}
			location.forEach(function (element) {
				if (element instanceof Entry) {
					route.push(element);
				}
			})
			for (i = 0; i < route.length; i++) {
				////((route[i].getRow() + entry.getRow()) / 2, (route[i].getCollumn() + entry.getCollumn()) / 2);
				board[(route[i].getRow() + entry.getRow()) / 2][(route[i].getCollumn() + entry.getCollumn()) / 2].setValue(0);
				board[(route[i].getRow() + entry.getRow()) / 2][(route[i].getCollumn() + entry.getCollumn()) / 2].kinged = false;;
				entry = route[i];
			}
			entry.setValue(id);
			entry.kinged = kinged;
			if (entry.getRow() == 7 || entry.getRow() == 0) {
				entry.kinged = true;
			}
			var msg = JSON.stringify(convertToObject(board));
			//(msg);
			socket.send(msg);
		},
		getBoard: function () {
			////("Board requested");
			return board;
		},
		setBoard: function (b) {
			board = b;
		},
		getId: function () {
			return id;
		},
		setId: function (player) {
			id = player;
		},
		getCanMove: function () {
			return canMove
		},
		toggleCanMove: function () {
			canMove = !canMove
		},
		getP1PiecesCaptured: function () {
			return p1piecesCaptured
		},
		getP2PiecesCaptured: function () {
			return p2piecesCaptured
		},
		setP1PiecesCaptured: function (num) {
			p1piecesCaptured = num;
		},
		setP2PiecesCaptured: function (num) {
			p2piecesCaptured = num;
		},
		whoWon: function () {
			var msg = Messages.O_GAME_OVER
			if (p1piecesCaptured == 12) {
				msg.data = 1;
				msg = JSON.stringify(msg);
				socket.send(msg);
				var stat = $(".status");
				stat.empty();
				stat.append("<h1>PLAYER 1 WON </h1>")
				return true
			}
			if (p2piecesCaptured === 12) {
				msg.data = 2;
				msg = JSON.stringify(msg);
				socket.send(msg)
				var stat = $(".status");
				stat.empty();
				stat.append("<h1>PLAYER 2 WON </h1>")
				return true
			}
			return false;
		},
		setSocket: function (sock) {
			socket = sock;
		}
	};
}(0));
$(document).ready(function () {
	function onlyUnique(arr) {
		var ret = [
		];
		arr.forEach(function (elements) {
			if (ret.indexOf(elements) == - 1) {
				ret.push(elements);
			}
		})
		return ret;
	}
	function flatten(arr) {
		var ret = [];
		arr.forEach(function (element) {
			if (Array.isArray(element)) {
				ret = ret.concat(flatten(element));
			}
			else {
				ret.push(element);
			}
		});
		return ret;
	}
	function determinelast(arr, entry) {
		var i;
		//(arr.indexOf(entry), entry, 'began')
		if (arr.indexOf(entry) !== (arr.length - 1)) {
			for (i = 0; i < arr.length; i++) {
				if (Array.isArray(arr[i])) {
					//(arr[i], 'recursion');
					return determinelast(arr[i], entry);
				}
			}
		}
		else {
			//(arr, 'returned');
			return arr;
		}
	}
	function getTable() {
		////("table requested");
		var table = twoDarray(8, 8),
			i,
			j;
		for (i = 0; i <= 7; i++) {
			for (j = 0; j <= 7; j++) {
				table[i][j] = $('tr.row' + (i + 1)).find('#' + (j + 1));
			}
		}
		return table;
	}
	function updatetable() {
		//("update started");
		var table = getTable();
		var board = Table.getBoard();
		var p1= 0,p2=0;
		for (i = 0; i <= 7; i++) {
			for (j = 0; j <= 7; j++) {
				if (board[i][j] != null) {
					table[i][j].off()
					switch (board[i][j].getValue()) {
						case 0:
							table[i][j].empty();
							table[i][j].append('<br>');
							break;
						case 1:
							p1++;
							table[i][j].empty();
							if (!board[i][j].kinged) {
								table[i][j].append('<img src =\'../images/untitled.png\'>');
							} else {
								table[i][j].append('<img src =\'../images/King red.png\'>');
							}
							break;
						case 2:
							p2++
							table[i][j].empty();
							if (!board[i][j].kinged) {
								table[i][j].append('<img src =\'../images/checkers black.png\'>');
							} else {
								table[i][j].append('<img src =\'../images/checkers black King.png\'>');
							}
							break;
					}
				}
			}
		}
		var stat = $(".status")
		if (Table.getCanMove()) {
			hlLegalpiece();
			stat.empty();
		} else{
			stat.empty();
			stat.append("<h1>Waiting on Opponent </h1>")
		}
		console.log(p1, p2);
		Table.setP1PiecesCaptured((12-p1));
		Table.setP2PiecesCaptured((12-p2));
		Table.whoWon();
		var p1div = $(".p1Pieces");
		var p2div = $(".p2Pieces");
		p1div.empty();
		p2div.empty();
		p1div.append("<h1>"+Table.getP1PiecesCaptured()+"</h1>");
		p2div.append("<h1>"+Table.getP2PiecesCaptured()+"</h1>");
	}
	function hlLegalpiece() {
		var table = getTable(),
			legalPieces = Table.legallist(),
			board = Table.getBoard();
		//(Table.legallist());
		legalPieces.forEach(function (element) {
			switch (board[element.getRow()][element.getCollumn()].getValue()) {
				case 1:
					table[element.getRow()][element.getCollumn()].empty();
					if (!board[element.getRow()][element.getCollumn()].kinged) {
						table[element.getRow()][element.getCollumn()].append('<img src = \'../images/Checkers red legal.png\'>');
					} else {
						table[element.getRow()][element.getCollumn()].append('<img src =\'../images/Red King LE.png\'>');
					}
					break;
				case 2:
					table[element.getRow()][element.getCollumn()].empty();
					if (!board[element.getRow()][element.getCollumn()].kinged) {
						table[element.getRow()][element.getCollumn()].append('<img src = \'../images/Checkers Black legal.png\'>');
					} else {
						table[element.getRow()][element.getCollumn()].append('<img src =\'../images/checkers black king legal.png\'>');
					}
					break;
			}
			table[element.getRow()][element.getCollumn()].on('click', {
				element: element
			}, showMoves);
		});
	}
	function showMoves(event) {
		var table = getTable(),
			highlight = event.data.element.legalMoves(Table.getId());
		highlight = flatten(highlight);
		highlight = onlyUnique(highlight);
		console.log(highlight);
		highlight.forEach(function (entry) {
			if (entry instanceof Entry) {
				// //(entry);
				table[entry.getRow()][entry.getCollumn()].empty();
				table[entry.getRow()][entry.getCollumn()].append('<img src = \'../images/legal.png\'>');
				table[entry.getRow()][entry.getCollumn()].on('click', {
					element: event.data.element,
					entry: entry
				}, move);
				table[event.data.element.getRow()][event.data.element.getCollumn()].off('click', showMoves);
				table[event.data.element.getRow()][event.data.element.getCollumn()].on('click', {
					element: event.data.element
				}, hideMoves);
			}
		});
	}
	function hideMoves(event) {
		var table = getTable(),highlight = event.data.element.legalMoves(Table.getId());
		highlight = flatten(highlight);
		highlight = onlyUnique(highlight);
		// //(highlight);
		highlight.forEach(function (entry) {
			if (entry instanceof Entry) {
				// //(entry);
				table[entry.getRow()][entry.getCollumn()].empty();
				table[entry.getRow()][entry.getCollumn()].append('<br>');
				table[entry.getRow()][entry.getCollumn()].off('click', move);
				table[event.data.element.getRow()][event.data.element.getCollumn()].on('click', {
					element: event.data.element
				}, showMoves);
				table[event.data.element.getRow()][event.data.element.getCollumn()].off('click', hideMoves);
			}
		});
	}
	function move(event) {
		//(event.data.element.legalMoves(Table.getId()).indexOf(event.data.entry) === (- 1));
		if (event.data.element.legalMoves(Table.getId()).indexOf(event.data.entry) === (- 1)) {
			var path = determinelast(event.data.element.legalMoves(Table.getId()), event.data.entry);
		} else {
			path = [
				event.data.entry
			];
		}
		////(event.data.element.legalMoves(Table.getId()), path, event.data.entry);
		if (event.data.element.legalMoves(Table.getId())[0] === 0) {
			// //("you rule")
			Table.move(event.data.element, event.data.entry);
		} else {
			//('hit run')
			Table.capture(event.data.element, path);
		}
		Table.toggleCanMove();
		updatetable();
	};
	(function setup() {
		var socket = new WebSocket('ws://localhost:3000/');
		updatetable();
		socket.onmessage = function (event) {
			//(event);
			var msg = JSON.parse(event.data);
			//(msg)
			if (msg.type === Messages.T_SET_PLAYER) {
				//("id set")
				Table.setId(parseInt(msg.data));
			}
			if (msg.type === Messages.T_YOUR_TURN) {
				Table.toggleCanMove();
				updatetable();
			}
			if (msg.type === Messages.T_MOVE_MADE) {
				Table.toggleCanMove();
				//(msg);
				Table.setBoard(convertFromObject(msg));
				updatetable();
			}
		}
		socket.onopen = function () {
			socket.send('{}');
		}
		socket.onclose = function () {
			if(!whoWon){
				var statbar = $(".status")
				statbar.empty();
				statbar.append("<h1>Game Aborted</h1>")
			}
		}
		Table.setSocket(socket);
	}())
});
