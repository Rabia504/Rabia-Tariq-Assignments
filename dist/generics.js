"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
// generics are like Templates in C++ we use the to avoid any type
// in order to restrict function to oly accept objects we did T extends Object
var addID = function (obj) {
    var id = Math.random().toString(16);
    return __assign(__assign({}, obj), { id: id });
};
var user = {
    name: "rabia"
};
var result = addID(user);
console.log(result);
var student1 = {
    name: "rabia",
    id: "bsef17"
};
var student2 = {
    name: "rabia",
    id: {
        section: "Morning"
    }
};
var teacher = {
    name: "rabia",
    id: "bsT1",
    course: ["maths", "physics"]
};
console.log("Course: " + teacher.course[0]);
