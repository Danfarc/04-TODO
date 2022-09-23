import './styles.css';
import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();
// const   tarea = new Todo('Aprender JavaScript');
// tarea.completado = false;
// todoList.nuevoTodo(tarea);
// crearTodoHtml(tarea);

// console.log(todoList.todos);

// localStorage.setItem('my-key','ABC');
// sessionStorage.setItem('my-key','ABC');

// setTimeout(() => {
//     localStorage.removeItem('my-key');
//     sessionStorage.removeItem('my-key');
// }, 1500);

// todoList.todos.forEach(todo => {
//     crearTodoHtml(todo);
// });

todoList.todos.forEach(crearTodoHtml);

// todoList.todos[0].imprimirClase();

// console.log('todos',todoList.todos);