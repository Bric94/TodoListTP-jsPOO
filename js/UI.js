export default class UI {
    constructor(todoList, selectors) {
        this.todoList = todoList;
        this.selectors = selectors;
        this.todoContainer = document.querySelector(selectors.todoList);
    }

    createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (todo.reminder) li.classList.add('reminder');
        li.id = todo.id;

        li.innerHTML = `
            <span>${todo.name} - ${todo.date}</span>
            <span class="delete-btn">✖</span>
        `;

        return li;
    }

    renderTodos(todos) {
        this.todoContainer.innerHTML = '';
        todos.forEach(todo => {
            const todoElement = this.createTodoElement(todo);
            this.todoContainer.appendChild(todoElement);
        });
    }

    updateTodoCount() {
        const count = document.querySelector(this.selectors.count);
        count.textContent = this.todoList.todos.length;
    }
}
