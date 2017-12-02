 const printInventory = require('../main/main').printInventory;
 const calinputs = require('../main/main').calinputs;
 const freeitem = require('../main/main').freeitem;
 const onSaleList = require('../main/main').onSaleList;
 const isOnSale = require('../main/main').isOnSale;
 const shoplist = require('../main/main').shoplist;

describe('pos', function () {
    var allItems;
    var inputs;

    beforeEach(function () {
        allItems = require('../main/datbase.js').loadAllItems();
        inputs = [
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
    });

    it('should print correct text', function () {

        spyOn(console, 'log');

        printInventory(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });

    it('should print calinputs', function () {

        //spyOn(console, 'log');

        let re=calinputs(inputs);

        var expectText = [{ item: 'ITEM000001', cou: 5 },
                          { item: 'ITEM000003', cou: 2 },
                          { item: 'ITEM000005', cou: 3 } ] ;

        expect(re).toEqual(expectText);
    });
    it('should print freeitem', function () {
        let re=freeitem(calinputs(inputs));
        var expectText = [ { barcode: 'ITEM000001', count: 1 },
            { barcode: 'ITEM000005', count: 1 } ] ;

        expect(re).toEqual(expectText);
    });

    it('should print onSaleList', function () {
        let re=onSaleList(freeitem(calinputs(inputs)));
        var expectText = [ { item: '雪碧', cnt: 1, unit: '瓶', price: 3 },
            { item: '方便面', cnt: 1, unit: '袋', price: 4.5 } ];

        expect(re).toEqual(expectText);
    });

});
