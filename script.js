window.addEventListener('load', loadSite);

/** This is where our program starts */
function loadSite() {
    addButtonListener();
    loadTodos();
}

function addButtonListener() {
    const button = document.querySelector('button');
    button.addEventListener('click', addTodoListener);
}

function loadTodos() {
    // Get the DOM ul element and list of todos
    const ul = document.querySelector('ul');
    const todos = getTodosFromLocalStorage();

    // Iterate over each todo and add it to the DOM
    for (const todo of todos) {
        const li = createTodoElement(todo);
        ul.append(li);
    };
}

function saveTodo(todoText) {
    // Get all saved todos from storage
    const todos = getTodosFromLocalStorage();

    // Add the todo to the list
    todos.push(todoText);

    // Save the update todos list to storage
    saveTodosToLocalStorage(todos);
}

function removeTodo(todoText) {
    // Get all saved todos from storage
    const todos = getTodosFromLocalStorage();

    // Remove the todo from the list
    const index = todos.indexOf(todoText);
    todos.splice(index, 1);

    // Save the update todos list to storage
    saveTodosToLocalStorage(todos);
}

function addTodoListener(event) {
    const input = event.target.previousElementSibling;

    // Create and add list item (li) to list (ul)
    const li = createTodoElement(input.value);
    document.querySelector('ul').append(li);

    // Add todo to local storage
    saveTodo(input.value);

    // Clear the input field
    input.value = "";
}

function removeTodoListener(event) {
    // Remove the li element from the DOM
    const li = event.target.parentElement;
    li.remove();

    // Also update local storage
    const todoText = event.target.nextSibling.textContent;
    removeTodo(todoText);
}

function createTodoElement(todoText) {
    // Create an li element
    const li = document.createElement('li');

    // Create a checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', removeTodoListener);

    // Add the checkbox and todo text to the list item
    li.append(checkbox, todoText);

    return li;
}

/* ------LOCAL STORAGE HELPER FUNCTIONS------ */

/**
 * Access the todos from local storage
 * @returns {Array<String>} list of todos
 */
function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

/**
 * Save all todos to local storage
 * @param {Array<String>} todos list of todos to be stored
 */
function saveTodosToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}