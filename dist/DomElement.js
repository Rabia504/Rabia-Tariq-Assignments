var someElement = document.querySelector(".foo");
console.log("Some Element : " + someElement.value);
var anotherElement = document.querySelector(".foo");
anotherElement.addEventListener("blur", function (event) {
    var target = event.target;
    console.log("event : " + target.value);
});
