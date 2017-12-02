'use strict';

const itemInfo = require("./datbase.js").loadAllItems;
const onsaleInfo = require("./datbase.js").loadPromotions;



function printInventory(arr){
    let f1=calinputs(arr);

    let f2=freeitem(f1);
    let f3=shoplist(f1,f2)[1];
    let f4=shoplist(f1,f2)[0];
    //console.log(f2);
    let f5=onSaleList(f2);
   // console.log(f5);
    let part1="***<没钱赚商店>购物清单***";
    for(let i=0;i<f4.length;i++){
        part1+="\n"+f4[i];
    }
    let part2="\n----------------------\n挥泪赠送商品：";
    let save=0;
    for(let i=0;i<f5.length;i++) {
        part2 += "\n名称：" + f5[i].item + "，数量：" + f5[i].cnt+f5[i].unit;
        save+=f5[i].price;
    }
    let part3="\n----------------------";
    part3+="\n总计："+f3.toFixed(2)+"(元)";
    part3+="\n节省："+save.toFixed(2)+"(元)\n**********************";

    part1+=part2+part3;
    console.log(part1);
}

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

function shoplist(arr,list){
    //let aa=calinputs(inputs);
    let result=[];
    let allcost=0;
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<itemInfo().length;j++){

            if(arr[i].item==itemInfo()[j].barcode){
                let con1=parseInt(isOnSale(arr[i].item,list));
                let con=parseInt(arr[i].cou - con1);
                let str="名称："+itemInfo()[j].name+"，数量："+arr[i].cou+itemInfo()[j].unit+"，单价："+itemInfo()[j].price.toFixed(2)+"(元)，小计："+(itemInfo()[j].price*con).toFixed(2)+"(元)";
                result.push(str);
                allcost+=itemInfo()[j].price*con;
                break;
            }
        }
    }
    let re=[];
    re.push(result);
    re.push(allcost);
    return re;
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
    for(let i=0;i<list.length;i++){
        if(arr==list[i].barcode) {
            return list[i].count;
        }
    }
    return 0;
}

function onSaleList(arr) {
    let result = [];
    let info = {item: null, cnt: 0, unit: null,price:0.00};
    let count;
    let aa = itemInfo();
    for (let i = 0; i < arr.length; i++) {
        info = {item: null, cnt: 0, unit: null,price:0.00};
        for (let j = 0; j < aa.length; j++) {
            if (arr[i].barcode == aa[j].barcode) {
                info.item = aa[j].name;
                info.cnt = arr[i].count;
                info.unit = aa[j].unit;
                info.price=aa[j].price;
                result.push(info);
                break;
            }
        }
    }
    return result;
}

module.exports = {
    printInventory:printInventory,
    calinputs:calinputs,
    shoplist:shoplist,
    freeitem:freeitem,
    onSaleList:onSaleList,
    isOnSale:isOnSale
}