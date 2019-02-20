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
        this.addTask = (task) => {
            tasks.push(task)
        };
        this.deleteTask = (task) => {};
        /*TODO:
        create addTask()
        create deleteTask()
        */
    }
}
class task{
    constructor(name){
        this.name = name;
        this.status = false;
    }
}



function rename(){

}