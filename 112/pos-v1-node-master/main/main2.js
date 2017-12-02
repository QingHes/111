'use strict';

const itemInfo = require("./datbase.js").loadAllItems;
const onsaleInfo = require("./datbase.js").loadPromotions;

//统计inputs集合里面各item的数量
function calinputs (arr){
    let searr=[];
    let mid=arr[0];
    let count;
    let ob = {item: mid, cou: count};
    let j;
    for(let i=0;i<arr.length;i++) {
        mid = arr[i].slice(0, 10);
        let len = parseInt(arr[i].slice(11));
        if (len) {
            count = len;
        }
        else {
            count = 1;
        }
        ob = {item: mid, cou: count};

        for (j = i + 1; j < arr.length; j++) {
            if (arr[i].slice(0, 10) == arr[j].slice(0, 10)) {
                if (parseInt(arr[j].slice(11)))
                    count = count + parseInt(arr[j].slice(11));
                else
                    count = count + 1;
            }else {
                i = j-1;
                ob.cou = count;
                searr.push(ob);
                break;
            }
        }
        if(j==arr.length){
            ob.cou=count;
            searr.push(ob);
            break;
        }
    }

    return searr;
}
function onSaleList(arr){
    let aa=itemInfo();
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<aa.)
    }
}

const inputs = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
];

function shoplist(arr,list){
    let aa=calinputs(inputs);
    let result=[];
    for(let i=0;i<aa.length;i++){
        for(let j=0;j<itemInfo().length;j++){

            if(aa[i].item==itemInfo()[j].barcode){
                let con1=parseInt(isOnSale(aa[i].item,list));
                let con=parseInt(aa[i].cou - con1);
                let str="名称："+itemInfo()[j].name+"，数量："+aa[i].cou+itemInfo()[j].unit+"，单价："+itemInfo()[j].price.toFixed(2)+"(元)，小计："+(itemInfo()[j].price*con).toFixed(2)+"(元)";
                result.push(str);
                break;
            }
        }
    }
    return result;
}

//传入统计好商品信息的list识别其中打折的list
function freeitem(list){

    let info={name:null,barcode:null,count:0};
    let sum;
    let result=[];
    let bar=onsaleInfo()[0].barcodes;
    for(let i=0;i<list.length;i++){
        for(let j=0;j<bar.length;j++){
            if(list[i].item==bar[j]){
                info={barcode:null,count:0};
                sum=list[i].cou%2;
                info.barcode=list[i].item;
                info.count=sum;
                result.push(info);
            }
        }
    }
    return result;
}
//传入条形码在打折商品中统计打折数量
function isOnSale(arr,list){
  //  let aa=calinputs(list);
 //   let sale=freeitem(aa);
  /*  for(let i=0;i<sale.length;i++){
        if(arr==sale[i].barcode) {
            return sale[i].count;
        }
    }*/
    for(let i=0;i<list.length;i++){
        if(arr==list[i].barcode) {
            return list[i].count;
        }
    }
    return 0;
}


/*
module.exports = function main() {
    console.log("Debug Info");
    return 'Hello World!';
};*/
/*let re2=shoplist();
console.log(re2);
*/

function printInventory(arr){
    /*
    let f1=calinputs(inputs);
console.log(f1);
let f2=freeitem(f1);
console.log(f2);
let f3=isOnSale(f1[0].item,f2);
console.log(f3);

let f4=shoplist(f1,f2);
console.log(f4);
     */

    let f1=calinputs(arr);
    let f2=freeitem(f1);
    let f4=shoplist(f1,f2);
    console.log(f2);
    let part1="***<没钱赚商店>购物清单***";
    for(let i=0;i<f4.length;i++){
        part1+="\n"+f4[i];
    }
    part1+="\n----------------------\n挥泪赠送商品：\n";
    console.log(part1);
}


printInventory(inputs);
//