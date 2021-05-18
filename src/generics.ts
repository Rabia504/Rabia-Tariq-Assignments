export {};
// generics are like Templates in C++ we use the to avoid any type
// in order to restrict function to oly accept objects we did T extends Object
const addID = <T extends object>(obj: T) =>{
    const id = Math.random().toString(16);
    return{
        ...obj,
        id
    };
};

interface UserInterface {
    name: string;
}

const user: UserInterface = {
    name: "rabia"
}

const result = addID<UserInterface>(user);
console.log(result);

// we can also use generic with interfaces
interface StudentInterface<T>{
    name: string;
    id: T;
}
const student1: StudentInterface<string> = {    //passing string datatype for T generic
    name: "rabia",
    id : "bsef17"
}
const student2: StudentInterface<{section: string}> = {  //passing object datatype for T generic
    name: "rabia",
    id : {
        section:"Morning"
    }
}

//passing multiple parameters to generics
interface TeacherInterface<T,V>{
    name: string;
    id: T;
    course: V;
}

const teacher: TeacherInterface<string, string[]> = {  
    name: "rabia",
    id : "bsT1",
    course : ["maths", "physics"]
}
console.log("Course: "+teacher.course[0])