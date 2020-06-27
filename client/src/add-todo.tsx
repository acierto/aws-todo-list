import * as React from 'react';
import {gql} from 'apollo-boost'
import {ENTER_KEY} from './constants';
import {useMutation} from '@apollo/react-hooks';
import {ALL_TODOS_GQL} from './todo-list';

const ADD_TODO_GQL = gql`
    mutation addTodo($title: String!) {
        addTodo(title: $title) {
            id
            title
        }
    }
`;

export const AddTodo: React.FC = (): JSX.Element => {
    const [addTodo] = useMutation(ADD_TODO_GQL, {
        refetchQueries: [{query: ALL_TODOS_GQL}]
    });
    const newTodoRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

    const handleNewTodoKeyDown = (event: React.KeyboardEvent) => {
        if (event.keyCode !== ENTER_KEY) {
            return;
        }
        event.preventDefault();

        const {current} = newTodoRef;
        if (current) {
            const val = current.value.trim();
            if (val) {
                addTodo({variables: {title: val}});
                current.value = '';
            }
        }
    }

    return <input
        autoFocus={true}
        className='new-todo'
        onKeyDown={handleNewTodoKeyDown}
        placeholder='What needs to be done?'
        ref={newTodoRef}
    />;
}
