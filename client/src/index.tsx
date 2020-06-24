import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './todo-app';
import {TodoModel} from './todo-model';

const model = new TodoModel('react-todos');

const render = () => ReactDOM.render(
    <TodoApp model={model}/>,
    document.getElementById('root')
);

model.subscribe(render);
render();
