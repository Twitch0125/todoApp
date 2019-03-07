class List {
  constructor(name, ...tasks) {
    this.name = name;
    this.tasks = tasks;
  }

  //TODO: create renameTask(), renameList();
  addTask(task) {
    console.log(`pushing task named: ${task.name} into list:${this.name}`);
    this.tasks.push(task);
    task.id = this.tasks.indexOf(task); //id is used to access task in tasks array
    console.log(`task named: ${task.name} has id: ${task.id}`);
  }
  deleteTask(task) {
    console.log(`removing task by id: ${task.id}`);
    this.tasks.splice(task.id);
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
    console.log(`'status is now ${this.status}'`); //log current status
  }
  rename(newName) {
    console.log(`'name was ${this.name}'`);
    this.name = newName;
    console.log(`'name is now ${this.name}`);
  }
}

class Description {
  constructor(date, content) {
    this.date = date;
    this.content = content;
  }
  //TODO: create editDate(), create editContent()
}

function createList() {
  let myVal = $("#listName").val();
  let newList = new List(myVal);
  let myJSON = JSON.stringify(newList);
  //check if name is blank
  if (myVal == "") {
    return 0;
  }
  localStorage.setItem(myVal, myJSON);
  console.log(`set local storage: ${myVal}, ${myJSON}`);

  //clear input
  $("#listName").val("");
  //reset material textfield
  $("#listName")
    .parent()
    .attr(
      "class",
      "mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-focused"
    );

  //show snackbar
  notification.MaterialSnackbar.showSnackbar(data);

  //refresh lists
  loadLists();
}

//delete list
function deleteList(list) {}

//display list
function displayList(list) {
  console.log(list);

  //get list from local storage
  let listObj = JSON.parse(localStorage.getItem(`${list}`));

  //show the hidden list-display div
  $("#list-display").css("display", "block");
  //hide list creation
  $("#list-creation").css("display", "none");
  //load list name in list name element
  $('.list-name').html(`${listObj.name}`);

}

//load lists in navigation
function loadLists() {
  //reset area
  $(".mdl-navigation").html(" ");
  //display new lists
  for (let i = 0; i < localStorage.length; i++) {
    //create link in html for list
    list = localStorage.key(i);
    $(".mdl-navigation").append(`
        <a class="mdl-navigation__link" onclick="displayList('${list}')" href="#"> ${list} </a>
        `);
  }
}

//checks if ENTER was pressed, and the ID of where it was pressed
function checkKey(event, id) {
  switch (event.key) {
    case "Enter":
        if(id == 'listName'){
            createList();
        }
      break;
  }
}

//material snackbar
var notification = document.querySelector(".mdl-js-snackbar");
var data = {
  message: "List Created",
  actionHandler: function() {
    notification.MaterialSnackbar.showSnackbar(
      (obj = {
        message: "Undone"
      })
    );
  },
  actionText: "Undo",
  timeout: 2500
};
