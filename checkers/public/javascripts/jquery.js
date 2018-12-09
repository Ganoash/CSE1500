
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
                   table[i][j].append("<img src ='../public/images/checkers legal black.png'>");
                   break;
               }
           }
        }
    }
}

function hlLegalpiece(){
    var table = getTable();
    var legalPieces = Table.legallist();
    var board = Table.getBoard();
    legalPieces.forEach(function(element){
        switch(board[element.getRow][element.getCollumn]){
            case 1:
            table[element.getRow][element.getCollumn].empty();
            table[element.getRow][element.getCollumn].append("")
        }
    });
}