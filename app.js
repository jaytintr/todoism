// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodo);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo)

// Functions
function addTodo(e) { 
    // Prevent from submitting
    event.preventDefault();
    console.log("Hello");

    // Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
     
    // Add Todo to Local Storage
    saveLocalTodo(todoInput.value);

    // Completed Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check" ></i>';
    completedButton.classList.add('completed-btn');

    // Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash" ></i>';
    trashButton.classList.add('trash-btn');
    
    // Append All to Todo Div
    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(trashButton);

    // Append Todo Div to List
    todoList.appendChild(todoDiv);

    // Clear Todo Input's Value
    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;
    // Delete
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        // Animate The Delete
        todo.classList.add('fall');
        removeLocalTodo(todo)
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
    }
    // Check
    if (item.classList[0] === "completed-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}

function filterTodo(e) {
    const allTodo = todoList.childNodes;
    allTodo.forEach((todo) => {
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

function saveLocalTodo(todo) {
    // Check - Do I already have things in there
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodo() {
    // Check - Do I already have things in there
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo) {
        // Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');

        // Completed Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check" ></i>';
        completedButton.classList.add('completed-btn');

        // Trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash" ></i>';
        trashButton.classList.add('trash-btn');
    
        // Append All to Todo Div
        todoDiv.appendChild(newTodo);
        todoDiv.appendChild(completedButton);
        todoDiv.appendChild(trashButton);

        // Append Todo Div to List
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodo(todo) {
    // Check - Do I already have things in there
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}