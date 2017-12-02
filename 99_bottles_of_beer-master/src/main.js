'use strict'


function beersong(number){
    let re="";
    if(number>2){
        re+=number+" bottles of beer on the wall, "+number+" bottles of beer.\n";
        re+="Take one down and pass it around, "+(number-1)+" bottles of beer on the wall.";
    }
    else if(number===2){
        re+=number+" bottles of beer on the wall, "+number+" bottles of beer.\n";
        re+="Take one down and pass it around, "+(number-1)+" bottle of beer on the wall.";
    }
    else if(number === 1){
        re+=number+" bottle of beer on the wall, "+number+" bottle of beer.\n";
        re+="Take one down and pass it around, no more bottles of beer on the wall.";
    }
    else{
        re+="No more bottles of beer on the wall, no more bottles of beer.\n" +
            "Go to the store and buy some more, 99 bottles of beer on the wall."
    }
    return re;


}
module.exports=beersong;