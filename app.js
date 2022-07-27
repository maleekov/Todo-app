const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCard = document.querySelectorAll(".card-body")[0];
const secondCard = document.querySelectorAll(".card-body")[1];
const clearAllTasks = document.querySelector("#clear-todos");
const idFilter = document.querySelector("#filter");


evenListeners();

function evenListeners(){

    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", addTasksFromStorage);
    secondCard.addEventListener("click", deletefromUI);
    idFilter.addEventListener("keyup", filterTasks);
    clearAllTasks.addEventListener("click", deleteAllTasks);
}

// adding Tasks 
function addTodo(e){

    const newTodo = todoInput.value.trim().toUpperCase();
    
        if( newTodo === ""){
            showAlert("danger", "Please add a task!");
        }
        else{
            addTodoToUI(newTodo);
            addtaskToStorage(newTodo);
            showAlert("success", "The task has successfuly been added");
        }

    e.preventDefault();

}

// showing tasks 
function addTodoToUI(newTodo){

    // creating elements
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    // setting values to the created elements 
    link.href = "#";
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    todoList.appendChild(listItem);

    // clearing the input 
    todoInput.value = "";

}

// Get from storage 
function getTasksFromStorage(){

    let tasks;

     if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else {

        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    return tasks;
}

//  Add task to storage 
function addtaskToStorage(newTodo){

    let tasks = getTasksFromStorage();

    tasks.push(newTodo);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Adding tasks from storage 
function addTasksFromStorage(){

    let tasks = getTasksFromStorage();
    tasks.forEach(task =>{
        addTodoToUI(task);
    });
            
}

// Show alert 
function showAlert(type,message){

    // creating the alert div

    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;
    firstCard.appendChild(div);

    // setting disappear function

    setTimeout(function(){
        div.remove();
    },1000);
}

// DELETING THE TASK FROM UI 
function deletefromUI(e){

    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTaskFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("warning", "The task has been deleted!")
    }
}

// DELETING TASK FROM STORAGE 
function deleteTaskFromStorage(deleteTodo){

    let tasks = getTasksFromStorage();
    //  delete todo is equal to the targeted element content(li)
    
    tasks.forEach(function (task, index){
    if(task === deleteTodo){
        tasks.splice(index, 1)};
    })

    //  THEN WE NEED TO SET NEW ARRAY BACK

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// FILTER TASKS 
function filterTasks(e){

    // CONST FOR THE WORDS PUT IN FILTER INPUT
    const filterValue = e.target.value.toUpperCase();

    // AND THE LIST OF LI ELEMENTS 
    const tasksList = document.querySelectorAll(".list-group-item");

    // FOR EACH LI WE ARE TRYING TO WRITE CONDITION 
    tasksList.forEach(taskList =>{

    // CONST FOR THE TEXT CONTENT OF EACH LI
    const taskListText = taskList.textContent.toUpperCase();
        if(taskListText.includes(filterValue) === false){
            taskList.setAttribute("style", "display : none !important");
        }else{
            taskList.setAttribute("style", "display : block");
        }
    })


}

// DELETE ALL TASKS FROM UI
function deleteAllTasks(){

   if(confirm("ARE YOU SURE TO DELETE ALL TASKS?",true)){
    while(todoList.firstElementChild !== null){
        todoList.removeChild(todoList.firstElementChild);  
    }
    localStorage.removeItem("tasks");
   }

    
    
    showAlert("warning", "All tasks have been deleted!");

}













