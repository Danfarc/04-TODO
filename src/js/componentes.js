import { todoList } from "..";
import { Todo } from "../classes";

// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list'); // clase en index.html
const txtInput    = document.querySelector('.new-todo');
const btnBorrar   = document.querySelector('.clear-completed');
const ulFiltros   = document.querySelector('.filters');
const anchorFiltro   = document.querySelectorAll('.filtro');



export const crearTodoHtml = (todo)=>{

    const htmlTodo =`
                    <li class="${(todo.completado)?'completed': ''}" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${(todo.completado)?'checked': ''}>
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>
                    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo

    divTodoList.append(div.firstElementChild);


    return div;

}

// Eventos

txtInput.addEventListener('keyup',(event)=>{
// console.log(event);
    if (event.keyCode === 13 && txtInput.value.length > 0) {

        // console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        // console.log(todoList);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click',(event)=>{
    // console.log('click');
    // console.log(event.target.localName);

    const nombreElemento = event.target.localName; //input, label , button
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }

    if( nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

    // console.log(todoElemento);
    // console.log(todoId);
    // console.log(todoList);
});


btnBorrar.addEventListener('click',()=>{
    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length - 1 ;i >= 0; i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
            // console.log(elemento);
        }
        
    }
    // console.log(todoList);
});

ulFiltros.addEventListener('click',(event)=>{

    // console.log(event.target.text);

    const filtro = event.target.text;

    if(!filtro){return;}

    anchorFiltro.forEach(element => {
        element.classList.remove('selected');
    });

    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){
        // console.log(elemento);
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro){

            case'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
            case'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
                break;
        }

    }

});