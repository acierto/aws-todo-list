import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoApp from './TodoApp';
import {TodoModel} from './todoModel';

const model = new TodoModel('react-todos');

ReactDOM.render(
    <TodoApp model={model}/>,
    document.getElementById('root')
);
