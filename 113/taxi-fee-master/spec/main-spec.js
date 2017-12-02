const taxifee = require('../main/main.js');

describe('taxi fee', function () {
    
    it("return taxi fee when 3.5km and 5min waited",function() {
        let result=taxifee(3.5,5);
        expect(result).toEqual(8);
    });
    it("return taxi fee when 2km and 0min waited",function() {
        let result=taxifee(2,0);
        expect(result).toEqual(6);
    });
    it("return taxi fee when 8km and 0min waited",function() {
        let result=taxifee(8,0);
        expect(result).toEqual(11);
    });
    it("return taxi fee when 10km and 0min waited",function() {
        let result=taxifee(10,0);
        expect(result).toEqual(13);
    });
});

