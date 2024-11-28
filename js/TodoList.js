export default class TodoList {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    }

    addTodo(todo) {
        this.todos.push(todo);
        this.saveToLocalStorage();
    }

    deleteTodoById(id) {
        this.todos = this.todos.filter(todo => todo.id !== parseInt(id));
        this.saveToLocalStorage();
    }

    toggleReminderById(id) {
        this.todos = this.todos.map(todo => 
            todo.id === parseInt(id) ? { ...todo, reminder: !todo.reminder } : todo
        );
        this.saveToLocalStorage();
    }

    filterTodosByReminder() {
        return this.todos.filter(todo => todo.reminder);
    }

    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}
