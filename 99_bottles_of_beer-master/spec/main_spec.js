'use strict'
const beersong = require('../src/main.js');

describe('beer song', function () {

  it("return when given the number bigger than 2", function() {
    let summary = beersong(99);
    let expected = '99 bottles of beer on the wall, 99 bottles of beer.\nTake one down and pass it around, 98 bottles of beer on the wall.'
    expect(summary).toEqual(expected)
  });

    it("return when given the number equals 2", function() {
        let summary = beersong(2);
        let expected ='2 bottles of beer on the wall, 2 bottles of beer.\n'
            +'Take one down and pass it around, 1 bottle of beer on the wall.'
        expect(summary).toEqual(expected)
    });


   it("return when given the number equals 1", function() {
        let summary = beersong(1);
        let expected ='1 bottle of beer on the wall, 1 bottle of beer.\n'
            +'Take one down and pass it around, no more bottles of beer on the wall.'
        expect(summary).toEqual(expected)
    });

   it("return when given the number smaller than 1", function() {
        let summary = beersong(0);
        let expected ='No more bottles of beer on the wall, no more bottles of beer.\n'
            +'Go to the store and buy some more, 99 bottles of beer on the wall.'
        expect(summary).toEqual(expected)
    });

});
