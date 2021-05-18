var a = "1";
var hello = "world";
//we an specify type of variable like this
var str = "i am tyoescrpted";
// speifying parameters type and return type of function as string
var getName = function (fname, lname) {
    return "Fullname: " + fname + " " + lname;
};
console.log(getName("Rabia", "Tariq"));
// working with arrays
var favoriteHobbies;
favoriteHobbies = ["reading", "sketching", "gaming"];
//working with objects
// if we want to specify types for object properties
var person = {
    name: "Rabia",
    age: 22,
    hobbies: ["reading", "sketching", "gaming"],
    role: [0, "admin"]
};
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(" Hobby: " + hobby.toUpperCase()); //allows all functionsof stringsas TS knows it's an array of strings
}
var user1 = {
    name: "Rabia",
    age: 22,
    getMessage: function () {
        return "hello " + user1.name;
    }
};
var user2 = {
    name: "Samoo",
    getMessage: function () {
        return "hello " + user2.name;
    }
};
console.log("Message: " + user1.getMessage());
//union in typescript
// used to allow ultiple datatypes for a variable
var errorMessage = null;
var pageNum = "1";
// we can also user interfaces in union
var user = null;
var food = ["pizza", "pastry", "chocolates"];
var menu1 = "chocolates";
var menu2 = ["pizza", "pastry", "chocolates"];
var menu3 = null;
// different types in typescript
//void returns nothing
var getMssg = function () {
    console.log("this is void function");
};
getMssg();
// any
// any datatype can be asigned to it avoid using any
var varAny = "i am string";
varAny = true;
varAny = 20;
var s1 = varAny;
//console.log(varAny.foo());
//never
// never ends puts function in infinite running state
var Never = function () {
    console.log("this is never ending function");
    throw "never";
};
//Never();
//unknown
// alternative to any but is more safer
var varUnknown = "i am string";
varUnknown = true;
varUnknown = 20;
//let s2: string = varUnknown; // gives error
//console.log(varUnknown.foo());  // gives error
var s2 = varUnknown;
//type Assertion or type casting in typescript
//as keyword converts unknown type to string
var s3 = varUnknown;
// we can also convert other datatypes to any datatype
// first we convert that datatype to unknown and then to the reuired datatype
var pageNumber = "2";
var numericPageNum = pageNumber;
console.log("Page Number: " + numericPageNum);
// enums
var RoleEnum;
(function (RoleEnum) {
    RoleEnum[RoleEnum["ADMIN"] = 0] = "ADMIN";
    RoleEnum[RoleEnum["READ_ONLY"] = 1] = "READ_ONLY";
    RoleEnum[RoleEnum["AUTHOR"] = 2] = "AUTHOR";
})(RoleEnum || (RoleEnum = {}));
console.log("ADMIN: " + RoleEnum.ADMIN + "  READ_ONLY: " + RoleEnum.READ_ONLY + " AUTHOR: " + RoleEnum.AUTHOR + " ");
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["NotStarted"] = "not statred";
    StatusEnum["InProgress"] = "In progress";
    StatusEnum["Done"] = "Done";
})(StatusEnum || (StatusEnum = {}));
// we can use emuns as datatypes as well
var notStartedStatus = StatusEnum.NotStarted;
notStartedStatus = StatusEnum.Done;
console.log("status of new task: " + StatusEnum.InProgress);
var task1 = {
    id: "A123",
    status: StatusEnum.Done
};
console.log("status of task1: " + task1.status);
