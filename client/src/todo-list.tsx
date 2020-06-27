import {useMutation, useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost'
import {TodoItem} from './todo-item';
import * as React from 'react';
import {useState} from 'react';

export const ALL_TODOS_GQL = gql`
    query {
        todos {
            id
            title
            completed
        }
    }
`;

export const REMOVE_TODO_GQL = gql`
    mutation removeTodo($id: Float!) {
        removeTodo(id: $id) {
            id
            title
            completed
        }
    }
`;

export const TOGGLE_TODO_GQL = gql`
    mutation toggleTodo($id: Float!) {
        toggleTodo(id: $id) {
            id
            title
            completed
        }
    }
`;

export const MODIFY_TODO_GQL = gql`
    mutation modifyTodo($id: Float!, $title: String!) {
        modifyTodo(id: $id, title: $title) {
            id
            title
            completed
        }
    }
`;

export const TodoList: React.FC = (): JSX.Element => {
    const {data} = useQuery(ALL_TODOS_GQL);
    const [editing, setEditing] = useState(0);

    const [modifyTodo] = useMutation(MODIFY_TODO_GQL, {
        refetchQueries: [{query: ALL_TODOS_GQL}]
    });

    const [removeTodo] = useMutation(REMOVE_TODO_GQL, {
        refetchQueries: [{query: ALL_TODOS_GQL}]
    });

    const [toggleTodo] = useMutation(TOGGLE_TODO_GQL, {
        refetchQueries: [{query: ALL_TODOS_GQL}]
    });

    const todos = data ? data.todos : [];

    return <ul className='todo-list'>
        {todos.map((todo: ITodo) => {
            const onDestroy = () => removeTodo({variables: {id: todo.id}});
            const onToggle = () => toggleTodo({variables: {id: todo.id}});
            const onSave = (id: number, title: string) => {
                modifyTodo({variables: {id, title}});
                setEditing(0);
            };
            const onCancel = () => {
                setEditing(0);
            };
            const onEdit = () => setEditing(todo.id);
            return (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDestroy={onDestroy}
                    onEdit={onEdit}
                    editing={editing === todo.id}
                    onSave={onSave}
                    onCancel={onCancel}
                />
            );
        })}
    </ul>;
};
