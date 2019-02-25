//function to clear list creation field on click
function clearListInput() {
    let listInput = document.getElementById('listInput');
    listInput.innerHTML = '';
    listInput.style.backgroundColor = '#dadfea';
}

class List {
    constructor(name, ...tasks) {
        this.name = name;
        this.tasks = tasks;
    }

    //TODO: create renameTask(), renameList();
    addTask(task) {
        console.log(`pushing task named: ${task.name} into list:${this.name}`);
        this.tasks.push(task);
        task.id = this.tasks.indexOf(task) //id is used to access task in tasks array
        console.log(`task named: ${task.name} has id: ${task.id}`);
    }
    deleteTask(task) {
        console.log(`removing task by id: ${task.id}`);
        this.tasks.splice(task.id)
        console.log(`task removed. `);
    }
}

class Task {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.status = false; //if task is done or not
        this.id; //task's value in an array
    }
    //changeStatus takes a boolean and can be either True for finished or False for notFinished
    //"do or do not, there is no try" -yoda
    changeStatus(condition) {
        console.log(`'status was ${this.status}'`);
        this.status = condition;
        console.log(`'status is now ${this.status}'`) //log current status
    }
    rename(newName) {
        console.log(`'name was ${this.name}'`);
        this.name = newName;
        console.log(`'name is now ${this.name}`)
    }
}

class Description {
    constructor(date, content) {
        this.date = date;
        this.content = content;
    }
    //TODO: create editDate(), create editContent()
}

let list = new List(`todo`);

let task = new Task('kaleb', 'is k o o l');

list.addTask(task);
list.deleteTask(task);

