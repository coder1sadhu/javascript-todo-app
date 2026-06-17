// Select Dom Elements
const input = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

// try to load saved todos from localstorage (if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function savetodos() {
    //Save current todos to localstorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Create a dom node for a todo object and append it to list
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    //checkbox to toggle completion 
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        textSpan.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        //Todo: Visual feedback: strike-through when completed 
        savetodos();
    })
    //Text of todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 20px';
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }
    //add Double-Click listner 
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim()
            textSpan.textContent = todo.text;
            savetodos();
        }
    })
    //delete todo button 
    const delbtn = document.createElement('button');
    delbtn.textContent = "Delete";
    delbtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        savetodos();
    })
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delbtn);
    return li
}

//Render the whole todo list from todo array
function render() {
    list.innerHTML = ''

    //Recreate each item 
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });
}

function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return;
    }

    //Push a new To do object
    todos.push({ text, completed: false });
    input.value = '';
    render()
    savetodos()
}

addBtn.addEventListener("click", addTodo);
input.addEventListener('keydown', (e)=>{
    if(e.key == 'Enter'){
        addTodo();
    }
})
render();