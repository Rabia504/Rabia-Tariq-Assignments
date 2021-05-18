export {};
// works like interfaces in java getFullName() must be implemented in the child classes
interface UserInterface {
    getFullName(): string;
}

class User implements UserInterface{
    private firstName: string;
    private lastName: string;
    // creates constant
    readonly unchangeableName : string;
    // creates static onstant variable of the class scope
    static readonly maxAge = 50;

    constructor (firstName:string , lastName:string){
        this.firstName = firstName;
        this.lastName = lastName ;
        this.unchangeableName = firstName;
    }
    
    getFullName() : string {
        return this.firstName+" "+this.lastName;
    }
}

//inheritance
class Student extends User{
  private stdID : string;

  getStudentID (): string {
    return this.stdID;
  }
} 

const user = new User("Rabia","Tariq");
console.log(user.getFullName());
console.log(User.maxAge);
const std = new Student("Rabia","Tariq");
console.log(std.getFullName());
console.log(std.getStudentID());
