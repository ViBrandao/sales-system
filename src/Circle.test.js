"use strict";
exports.__esModule = true;
var Circle_1 = require("./Circle");
test("Should calculate the area of circle", function () {
    var circle = new Circle_1["default"](2);
    expect(circle.getArea()).toBe(12.566370614359172);
});
