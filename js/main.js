//function to clear list creation field on click
function clearListInput(){
let listInput = document.getElementById('listInput');
listInput.innerHTML='';
listInput.style.backgroundColor='#dadfea';    
}

class list{
    constructor(name,...tasks){
        this.name = name;
        this.tasks = tasks;
        this.addTask = (task) => {};
        this.deleteTask = (task) => {};
        this.renameList = (name) => {};
    }
}