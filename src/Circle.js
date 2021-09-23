"use strict";
exports.__esModule = true;
var Circle = /** @class */ (function () {
    function Circle(radius) {
        this.radius = radius;
    }
    Circle.prototype.getArea = function () {
        return 2 * Math.PI * this.radius;
    };
    return Circle;
}());
exports["default"] = Circle;
