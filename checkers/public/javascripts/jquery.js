function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}
function determinelast(arr, entry){
    if(arr.indexOf(entry)==-1){
        arr.forEach(function(element){
            if(Array.isArray(element)){
                return determinelast(element, entry);
            }
        });
    }
    else{
        return arr;
    }
}
function getTable(){
    var table = twoDarray(8,8), i, j;
    for(i = 0; i <= 7; i + 1){
        for(j = 0; j <= 7; j + 1){
           table[i][j] = $("."+(i+1)+" #"+(j+1));
        }
    }
    return table;
}
function updatetable(){
    var table = getTable();
    var board = Table.getBoard();
    for(i = 0; i <= 7; i + 1){
        for(j = 0; j <= 7; j + 1){
           if(board[i][j] != null){
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
}

function hlLegalpiece(){
    var table = getTable(), legalPieces = Table.legallist(), board = Table.getBoard();
    legalPieces.forEach(function(element){
        switch(board[element.getRow()][element.getCollumn]){
            case 1:
            table[element.getRow()][element.getCollumn()].empty();
            table[element.getRow()][element.getCollumn()].append("<img src = '../public/images/Checkers red legal.png'>");
            break;
            case 2:
            table[element.getRow()][element.getCollumn()].empty();
            table[element.getRow()][element.getCollumn()].append("<img src = '../public/images/Checkers Black legal.png'>");
            break;
        }
        $("."+element.getRow()+" #"+element.getCollumn).click(showMoves(element));
    });
}

function showMoves(element){
    var highlight = element.legalMoves(), table = getTable();
    flatten(highlight);
    onlyUnique(highlight);
    highlight.forEach(function(entry){
        table[entry.getRow()][entry.getCollumn()].empty();
        table[entry.getRow()][entry.getCollumn()].append("<img src = '../public/images/legal.png'>");
        $("."+entry.getRow()+" #"+entry.getCollumn()).click(move(element,entry));
    });
    
}

function move(element,entry){
    var path = determinelast(element, entry);
    if(path.indexOf(entry) !== path.length-1 && element.legalMoves[0] === 0){
        Table.move(entry, element);
    } else{
        Table.capture(path, element);
    }
    updatetable();
}