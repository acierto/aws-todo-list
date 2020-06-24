import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoApp from './todo-app';
import {TodoModel} from './todo-model';

const model = new TodoModel('react-todos');

ReactDOM.render(
    <TodoApp model={model}/>,
    document.getElementById('root')
);
