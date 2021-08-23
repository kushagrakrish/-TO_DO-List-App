// ******SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// ******EVENT LISTNERS**********
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// FUNCTIONS**********
function addTodo(event) {
  // prevent form from submitting
  event.preventDefault();
  // TODO DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Creating Li's
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // ADD TODO TO LOCAL STORAGE
  saveLocalTodos(todoInput.value);

  // CREATING CHECK BUTTON
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check"> </i> ';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);
  // CREATING TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"> </i> ';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // APPEND TO LIST
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}
// DELETEING THE TOO DOO
function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // for adding the animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // CHECKING MARK CREATION
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// function filterTodo(e){
// const todos=todoList.childNodes;
// // console.log(todos);
// todos.forEach(function(todo){
// switch(e.target.value){
//     case "all":
//         todo.style.display="flex";
//     break;
//     case "completed":
//         if(todo.classList.contains("completed")){
//             todo.style.display="flex";

//         }else{
//             todo.style,display="none";
//         }
// }
// });
// }
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
  console.log(todos);
}

// fACING eRRO IN THE ABOVE CODE

function saveLocalTodos(todo) {
  // checking do things already exist
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // checking do things already exist
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // TODO DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Creating Li's
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // CREATING CHECK BUTTON
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"> </i> ';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    // CREATING TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"> </i> ';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}
function removeLocalTodos(todo) {
  // checking do things already exist
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todo.children[0].innerText);
  // console.log(todos.indexof("sd"));
}
