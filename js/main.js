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
}

class Task {
  constructor(name) {
    this.name = name;
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
}
//rename function
function rename(task, newName) {
  console.log(`'name was ${task.name}'`);
  task.name = newName;
  console.log(`'name is now ${task.name}`);
}

//function to show list creation div
function showCreateLists() {
  $("#list-creation").css("display", "block");
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

function createTask() {
  let myVal = $("#taskName").val();
  //check if the name is blank
  if (myVal == "") {
    return 0;
  }
  let newTask = new Task(myVal);
  //get current list
  let listName = $(".list-name").html();
  let list = JSON.parse(localStorage.getItem(`${listName}`));

  //log what task is being pushed to given list
  console.log(`pushing task: ${newTask.name} into list ${list.name}`);
  //assign task's ID, which is where its located in the array
  newTask.id = list.tasks.length;
  //push task to list.tasks
  list.tasks.push(newTask);
  console.log(list);

  //store list in localStorage with given list name
  let myJSON = JSON.stringify(list);
  localStorage.setItem(listName, myJSON);
  //display new task to table
  loadTasks();
  //clear input
  $("#taskName").val("");
  //reset material textfield
  $("#taskName")
    .parent()
    .attr(
      "class",
      "mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
    );
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
  $(".list-name").html(`${listObj.name}`);
  //load create task thingy
  $(".create-task").css("display", "block");

  //load tasks
  loadTasks();
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

//load task table in a list
function loadTasks() {
  //get current list
  let listName = $(".list-name").html();
  let list = JSON.parse(localStorage.getItem(`${listName}`));

  //clear all task rows
  $(".task").remove();
  //display tasks in current list in the task table
  for (let i = 0; i < list.tasks.length; i++) {
    $(".task-table").append(`
    <tr class="task" id="${i}">
    <td class="mdl-data-table__cell--non-numeric">${list.tasks[i].name}</td>
  </tr>`);
  $(`.task:nth-of-type(${i + 2})`).append(`
  <span onclick=deleteTask(${i}) class="mdl-chip">
  <span class="mdl-chip__text"></span>
  <a href="#" class="mdl-chip__action"><i class="material-icons">cancel</i></a>
</span>
  `)

  }
}

function deleteTask(taskId) {
  console.log("taskId is", taskId);

  //get current list
  let listName = $(".list-name").html();
  let list = JSON.parse(localStorage.getItem(`${listName}`));
  list.tasks.splice(taskId, 1);
  console.log(`task removed. `);
  let myJSON = JSON.stringify(list);
  localStorage.setItem(listName, myJSON);

  loadLists();
}

function deleteList(){
  localStorage.clear();
}

function editTasks() {
  if ($(".save-btn").hasClass("visible")) {
    return 0;
  } else {
    //show the "deleteable chip" from MDL for each task item
    $(".mdl-chip").addClass("visible");
    //make tasks editable
    $(".mdl-data-table__cell--non-numeric").attr("contenteditable", "true");
    //show "save" button.
    $(".save-btn").addClass("visible");
  }
}

function saveTasks() {
  console.log("saveTasks()");

  $(".mdl-data-table__cell--non-numeric").attr("contenteditable", "false");
  $(".mdl-chip").remove();
  $(".save-btn").removeClass("visible");
  $(".mdl-chip").removeClass("visible");
  //get current list
  let listName = $(".list-name").html();
  let list = JSON.parse(localStorage.getItem(`${listName}`));
  //rename each task
  for (let i = 0; i < list.tasks.length; i++) {
    //get task name
    console.log("getting task:", $(`#${i}`).text());

    let name = $(`#${i}`).text();
    let task = list.tasks[i];
    console.log("task is ", task);
    //rename task with the new name
    rename(task, name);
  }
  //store list in localStorage
  let myJSON = JSON.stringify(list);
  localStorage.setItem(listName, myJSON);
  //refresh tasks
  loadTasks();
}



//checks if ENTER was pressed, and the ID of where it was pressed
function checkKey(event, id) {
  switch (event.key) {
    case "Enter":
      if (id == "listName") {
        createList();
      }
      if (id == "taskName") {
        createTask();
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
  actionText: " ",
  timeout: 2500
};

var editData = {
  message: "Hit Enter to Save Changes",
  actionHandler: function() {
    notification.MaterialSnackbar.showSnackbar(
      (obj = {
        message: "Undone"
      })
    );
  },
  actionText: " ",
  timeout: 2500
};
