import TodoList from './TodoList.js';
import UI from './UI.js';
import Todo from './ToDo.js';

class App {
    constructor() {
        this.todoList = new TodoList();
        this.ui = new UI(this.todoList, {
            todoList: '.todo-list',
            count: '#count'
        });

        this.isFormHidden = false; // État pour savoir si le formulaire est caché
        this.initialize();
    }

    initialize() {
        this.ui.renderTodos(this.todoList.todos);
        this.ui.updateTodoCount();
        this.addEventListeners();
    }

    addEventListeners() {
        // Gestion du formulaire d'ajout de tâches
        document.querySelector('.todo-form').addEventListener('submit', e => {
            e.preventDefault();
            const task = document.getElementById('task').value;
            const date = document.getElementById('due-date').value;
            const reminder = document.getElementById('reminder').checked;

            const newTodo = new Todo(
                Date.now(),
                task,
                date,
                reminder
            );

            this.todoList.addTodo(newTodo);
            this.ui.renderTodos(this.todoList.todos);
            this.ui.updateTodoCount();
            e.target.reset();
        });

        // Gestion de la suppression des tâches
        document.querySelector('.todo-list').addEventListener('click', e => {
            if (e.target.classList.contains('delete-btn')) {
                const id = e.target.parentElement.id;
                this.todoList.deleteTodoById(id);
                this.ui.renderTodos(this.todoList.todos);
                this.ui.updateTodoCount();
            }
        });

        // Gestion de l'affichage/masquage du formulaire
        document.querySelector('.toggleForm').addEventListener('click', e => {
            this.isFormHidden = !this.isFormHidden; // Bascule l'état

            const todoFormElement = document.querySelector('.todo-form');
            if (this.isFormHidden) {
                todoFormElement.classList.add('hide'); // Masque le formulaire
                e.target.innerText = 'Afficher';
                e.target.classList.add('bg-green');
                e.target.classList.remove('bg-red');
            } else {
                todoFormElement.classList.remove('hide'); // Affiche le formulaire
                e.target.innerText = 'Cacher';
                e.target.classList.add('bg-red');
                e.target.classList.remove('bg-green');
            }
        });

        // Gestion des tâches avec rappel
        document.querySelector('.reminder-all').addEventListener('click', e => {
            this.isFilteredByReminder = !this.isFilteredByReminder;

            if (this.isFilteredByReminder) {
                // Filtrer par rappel
                const filteredTodos = this.todoList.filterTodosByReminder();
                this.ui.renderTodos(filteredTodos);
                e.target.innerText = 'Afficher tout';
            } else {
                // Afficher toutes les tâches
                this.ui.renderTodos(this.todoList.todos);
                e.target.innerText = 'Par rappel';
            }
        });
    }
}

new App();
