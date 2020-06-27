import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost'
import {TodoItem} from './todo-item';
import * as React from 'react';

// tslint:disable-next-line:no-empty-interface
interface IPorps {
    // loading: boolean;
    // model: ITodoModel;
}

export const ALL_TODOS_GQL = gql`
    query {
        todos {
            id
            title
            completed
        }
    }
`;

const doNothing = () => ({});

export const TodoList: React.FC<IPorps> = (): JSX.Element => {
    const {data} = useQuery(ALL_TODOS_GQL);
    const todos = data ? data.todos : [];

    return <ul className='todo-list'>
        {todos.map((todo: ITodo) => {
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
