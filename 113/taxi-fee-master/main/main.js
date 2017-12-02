'use strict'
function taxtfee(km,min){
    let fee=0;
    if(km-2>=0){
        fee+=6;
    }
    if(km>2){
        if(km<=8){
            fee+=(km-2)*0.8;
        }
        else if(km>=8){
            fee+=6*0.8;
            fee+=(km-8)*0.8*1.5;
        }
    }
    fee+=0.25*min;
    return Math.round(fee);

}
module.exports = taxtfee;