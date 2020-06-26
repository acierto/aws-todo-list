import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost'
import {TodoItem} from './todo-item';
import * as React from 'react';

interface IPorps {
    loading: boolean;
    model: ITodoModel;
}

const ALL_TODOS = gql`
    query {
        todos {
            id
            text
            completed
        }
    }
`;

const doNothing = () => ({});

const TodoList: React.FC<IPorps> = (): JSX.Element => {
    const {data} = useQuery(ALL_TODOS);

    return <ul className='todo-list'>
        {data.todos.map((todo: ITodo) => {
            return (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={doNothing}
                    onDestroy={doNothing}
                    onEdit={doNothing}
                    editing={false}
                    onSave={doNothing}
                    onCancel={doNothing}
                />
            );
        })}
    </ul>;
};

export default TodoList;
