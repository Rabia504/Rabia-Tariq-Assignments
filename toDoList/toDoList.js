var taskNo = 0;

//function to add new task
let addNewTask = () => {
    taskNo++;

    //first dynamically create section to add tasks
    var mainDiv = document.createElement("div");
    mainDiv.className="to-do-list";
    mainDiv.id = taskNo;
    var row1 = document.createElement("div");
    row1.className="row1";
    var column1 = document.createElement("div");
    column1.className="column1";
    column1.id="task"+taskNo;
    var para1 = document.createElement("p");
    para1.id = "c1-"+column1.id;
    column1.appendChild(para1);

    var column2 = document.createElement("div");
    column2.className="column2";
    column2.id="date"+taskNo;
    var para2 = document.createElement("p");
    para2.id = "c2-"+column2.id;
    column2.appendChild(para2);

    row1.appendChild(column1);
    row1.appendChild(column2);

    var row2 = document.createElement("div");
    row2.className="row2";
    var li1 = document.createElement("li");
    li1.className="fa fa-pencil";
    var li2 = document.createElement("li");
    li2.className="fa fa-check";
    var li3 = document.createElement("li");
    li3.className="fa fa-remove";
    
    li1.style.fontSize = li2.style.fontSize = li3.style.fontSize = '24px';
    li2.style.marginRight = li3.style.marginRight = '10px';
    
    row2.appendChild(li1);
    row2.appendChild(li2);
    row2.appendChild(li3);

    mainDiv.appendChild(row1);
    mainDiv.appendChild(row2);
    document.getElementById("list-container").appendChild(mainDiv);

    //add the task content
    setTask();
    //add date and time
    setDateTime();

    //remove Task from to do list
    removeTask();

    //mark task as complete
    checkTask();

    //edit task
    editTask();

}

let removeTask = () => {
    var remove = document.getElementsByClassName("fa-remove");
    for (var i = 0; i < remove.length; i++) {
    remove[i].onclick = function() {
    var div = this.parentElement.parentElement;
    div.style.display = "none";
  }
}

}
let checkTask = () => {
    var check = document.getElementsByClassName("fa-check");
    for (var i = 0; i < check.length; i++) {
      check[i].onclick = function() {
        var div = this.parentElement.parentElement;
        div.style.backgroundColor = "grey";
      }
    }
}

let editTask = () => {

    for (var i = 0; i < edit.length; i++) {
    edit[i].onclick = function() {
    var task = prompt("enter the task");
    this.parentElement.parentElement.firstChild.firstChild.firstChild.textContent = `ToDo: ${i} ${task}`;
    this.parentElement.parentElement.firstChild.lastChild.firstChild.textContent = getDateTime();

     }
   }
  }


let setDateTime = () => {
    var d =new Date();
    var date = d.toLocaleDateString('en-GB');
    var time = d.toLocaleTimeString('en-US');
    var d1 = `${date} @ ${time}`;
    var d = document.createTextNode(d1);
    let d0 = "c2-date"+taskNo;
    var container2 = document.getElementById(d0);
    container2.appendChild(d);

}

let setTask = () => {
    var task = document.getElementById("addTask").value;
    var t1 = `ToDo: ${taskNo} ${task}`;
    var t = document.createTextNode(t1);
    let t0 = "c1-task"+taskNo;
    var container1 = document.getElementById(t0);
    container1.appendChild(t);

}

let getDateTime = () => {
    var d =new Date();
    var date = d.toLocaleDateString('en-GB');
    var time = d.toLocaleTimeString('en-US');
    return `${date} @ ${time}`;

}

