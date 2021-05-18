const a="1";
let hello="world";

//we an specify type of variable like this
let str :string ="i am tyoescrpted";


// speifying parameters type and return type of function as string
const getName = (fname:string, lname:string): string =>{
    return `Fullname: ${fname} ${lname}`;
}
console.log(getName("Rabia","Tariq"));

// working with arrays
let favoriteHobbies: string[];
favoriteHobbies = ["reading", "sketching", "gaming"];

//working with objects
// if we want to specify types for object properties
const person: {
    name: string;
    age : number;
    hobbies: string[];
    role: [number,string];  //tuple type  - this restricts array to have exactly 2 elements of given datatypes 
} = {
    name: "Rabia",
    age: 22,
    hobbies: ["reading", "sketching", "gaming"],
    role: [0, "admin"]
}
for (const  hobby of person.hobbies)
{
    console.log(" Hobby: "+hobby.toUpperCase());  //allows all functionsof stringsas TS knows it's an array of strings
}

//a better alternative for  the  above approach
// defining blueprint of object using interface
// by default all fields are mandatory
// ? is for optional fielda
interface UserInterface {
    name: string;
    age? : number;
    getMessage() : string;
}
const user1: UserInterface= {
    name: "Rabia",
    age: 22,
    getMessage(){
        return "hello "+ user1.name;
    }
}
const user2: UserInterface ={
    name: "Samoo",
    getMessage(){
        return "hello "+ user2.name;
    }
}

console.log("Message: "+user1.getMessage());



//union in typescript
// used to allow ultiple datatypes for a variable

let errorMessage: string | null = null;
let pageNum: string | number = "1";

// we can also user interfaces in union
let user: UserInterface | null = null;



//aliases for datatypes
type ID = string;
interface StudentInterface {
    id: ID,
    name: string;
    age? : number;
}
type Food = string;
const food: Food[] = ["pizza", "pastry", "chocolates"];
//const food2: Food[] = null;


// aliases + union
type FoodMenu = Food | null;
const menu1: FoodMenu =  "chocolates";
const menu2: FoodMenu[] =  ["pizza", "pastry", "chocolates"];
const menu3: FoodMenu =  null;


// different types in typescript
//void returns nothing
const getMssg = (): void =>{
    console.log("this is void function");
}
getMssg();

// any
// any datatype can be asigned to it avoid using any
let varAny: any = "i am string";
varAny = true;
varAny = 20;
let s1: string = varAny;
//console.log(varAny.foo());

//never
// never ends puts function in infinite running state
const Never = (): never =>{
    console.log("this is never ending function");
    throw "never";
}
//Never();

//unknown
// alternative to any but is more safer
let varUnknown: unknown = "i am string";
varUnknown = true;
varUnknown = 20;
//let s2: string = varUnknown; // gives error
//console.log(varUnknown.foo());  // gives error
let s2: unknown = varUnknown; 

//type Assertion or type casting in typescript
//as keyword converts unknown type to string
let s3: string = varUnknown as string;

// we can also convert other datatypes to any datatype
// first we convert that datatype to unknown and then to the reuired datatype
let pageNumber : string = "2";
let numericPageNum : number = (pageNumber as unknown) as number;
console.log("Page Number: "+numericPageNum);



// enums
enum RoleEnum {
    ADMIN ,
    READ_ONLY ,
    AUTHOR
}
console.log(`ADMIN: ${RoleEnum.ADMIN}  READ_ONLY: ${RoleEnum.READ_ONLY} AUTHOR: ${RoleEnum.AUTHOR} `);


enum StatusEnum {
    NotStarted = "not statred",
    InProgress = "In progress",
    Done = "Done"
}

// we can use emuns as datatypes as well
let notStartedStatus: StatusEnum  = StatusEnum.NotStarted;
notStartedStatus = StatusEnum.Done;
console.log("status of new task: "+StatusEnum.InProgress);

interface Task {
    id : string;
    status : StatusEnum;
}
let task1 : Task = {
    id: "A123",
    status: StatusEnum.Done
}
console.log("status of task1: "+task1.status);

