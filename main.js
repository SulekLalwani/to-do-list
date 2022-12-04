const taskDivContent = `
<p></p>
<div>
    <button class="editBtn" onclick="editTask(this)"><i></i></button>
    <button class="deleteBtn" onclick="deleteTask(this)"><i></i></button>
</div>
<form class="taskForm" onsubmit="preventSubmit(event)" hidden>
    <input class="taskInput" placeholder="Enter task name" />
    <div>
    <button class="acceptBtn" onclick="saveTask(this)"><i></i></button>
    <button class="cancelBtn" onclick="cancel(this)"><i></i></button>
    </div>
</form>
`;

//Checks if the task item is set in local storage and sets it if its not already set.
if (!localStorage.getItem("task")) {
  localStorage.setItem("task", "[]");
}

//Prevents reloading of the page when form is submitted.
function preventSubmit(event) {
  event.preventDefault();
}

//Checks for the list of tasks in local storage and adds them to the page.
function getTasks() {
  const tasks = JSON.parse(localStorage.getItem("task"));
  for (i = 0; i < tasks.length; i++) {
    const taskDiv = document.createElement("div");
    taskDiv.setAttribute("class", "task");
    taskDiv.innerHTML += taskDivContent;
    taskDiv.childNodes[1].textContent = tasks[i];
    document.body.childNodes[1].appendChild(taskDiv);
  }
}

//Allows user to edit the task when the edit button is cliked.
function editTask(button) {
  const task = button.parentNode.parentNode.childNodes[1].textContent;

  const buttons = document.getElementsByClassName("editBtn");
  for (i = 0; i < buttons.length; i++) {
    document.getElementsByClassName("task")[i].childNodes[3].hidden = false;
    document.getElementsByClassName("task")[i].childNodes[5].hidden = true;

    if (!document.getElementsByClassName("task")[i].childNodes[1].textContent) {
      document.getElementsByClassName("task")[i].remove();
    }
  }

  button.parentNode.hidden = true;
  button.parentNode.parentNode.childNodes[5].hidden = false;
  button.parentNode.parentNode.childNodes[5].childNodes[1].value = task;
  button.parentNode.parentNode.childNodes[5].childNodes[1].focus();
}

//Allows user to save the task once it has been created or edited when the save button is clicked.
function saveTask(button) {
  const task = button.parentNode.parentNode.childNodes[1].value;

  if (!task) {
    console.log("No task inputed");
    button.parentNode.parentNode.childNodes[1].style.border = "solid red 1px";
  } else {
    const buttons = document.getElementsByClassName("acceptBtn");
    for (i = 0; i < buttons.length; i++) {
      if (button == buttons[i]) {
        const tasks = JSON.parse(localStorage.getItem("task"));
        tasks.splice(i, 1, task);
        localStorage.setItem("task", JSON.stringify(tasks));
      }
    }
    button.parentNode.parentNode.parentNode.childNodes[1].innerHTML = task;
    button.parentNode.parentNode.hidden = true;
    button.parentNode.parentNode.parentNode.childNodes[3].hidden = false;
    button.parentNode.parentNode.childNodes[1].style.border = "";
  }
}

//Allows user to delete the task when the delete button is clicked.
function deleteTask(button) {
  const buttons = document.getElementsByClassName("deleteBtn");
  for (i = 0; i < buttons.length; i++) {
    if (button == buttons[i]) {
      tasks = JSON.parse(localStorage.getItem("task"));
      tasks.splice(i, 1);
      localStorage.setItem("task", JSON.stringify(tasks));
    }
  }

  button.parentNode.parentNode.remove();
}

//Allows user to discard the edit of a task or the creation of a new task when the cancel button is cliked.
function cancel(button) {
  const task =
    button.parentNode.parentNode.parentNode.childNodes[1].textContent;

  if (!task) {
    button.parentNode.parentNode.parentNode.remove();
  } else {
    button.parentNode.parentNode.hidden = true;
    button.parentNode.parentNode.parentNode.childNodes[3].hidden = false;
    button.parentNode.parentNode.childNodes[1].style.border = "";
  }
}

//Allows user to add a new task when the add button is clicked.
function addTask() {
  if (
    !document.querySelector(".task:last-of-type") ||
    document.querySelector(".task:last-of-type").childNodes[1].innerText
  ) {
    const taskDiv = document.createElement("div");
    taskDiv.setAttribute("class", "task");
    taskDiv.innerHTML += taskDivContent;
    taskDiv.childNodes[5].hidden = false;
    taskDiv.childNodes[3].hidden = true;

    const tasks = document.getElementsByClassName("task");
    for (i = 0; i < tasks.length; i++) {
      document.getElementsByClassName("task")[i].childNodes[3].hidden = false;
      document.getElementsByClassName("task")[i].childNodes[5].hidden = true;

      if (
        !document.getElementsByClassName("task")[i].childNodes[1].textContent
      ) {
        document.getElementsByClassName("task")[i].remove();
      }
    }

    document.body.childNodes[1].appendChild(taskDiv);
    taskDiv.childNodes[5].childNodes[1].focus();
  }
}
