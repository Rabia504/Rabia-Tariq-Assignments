const someElement = document.querySelector(".foo") as HTMLInputElement;
console.log("Some Element : "+someElement.value);

const anotherElement = document.querySelector(".foo");
anotherElement.addEventListener("blur", (event)=>{
    const target = event.target as HTMLInputElement;
    console.log("event : "+ target.value);
})
