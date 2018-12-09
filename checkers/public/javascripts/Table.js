function twoDarray(x, y){
    var ret = new Array();
    for(var i = 0; i < x; i++){
        ret.push(new Array(y));
    }
    return ret;
}

var start = twoDarray(8,8);
for(var i = 0; i <= 8; i++){
    for(var j = 0; j <= 8; j++){
        if((i+j)%2==1){
            start[i][j]=-1;
        }
        else if(i<=3){
            start[i][j]=1;
        }
        else if(i>=6){
            start[i][j]=2;
        }
        else{
            start[i][j]=0;
        }
    }
}

function Entry(collumn, row, value){
    this.collumn = collumn;
    this.row = row;
    this.value = value;
    this.pointers = new Array(4);
}

Entry.prototype.getCollumn= function(){return this.collumn};
Entry.prototype.getRow = function(){return this.row};
Entry.prototype.getValue = function(){return this.value};
Entry.prototype.setValue = function(value){this.value = value};
Entry.prototype.setPointer = function(index, pointer){this.pointers[index] = pointer};
Entry.prototype.getPointer = function(index){return this.pointers[index]}