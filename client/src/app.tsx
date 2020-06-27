import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks'
import {ALL_TODOS_GQL, TodoList} from './todo-list';
import {AddTodo} from './add-todo';
import {Footer} from './footer';
import {Filter} from './constants';
import {gql} from 'apollo-boost';

const SET_FILTER_GQL = gql`
    mutation setFilter($filter: Float!) {
        setFilter(filter: $filter)
    }
`;

const App: React.FC = () => {
    const {data} = useQuery(ALL_TODOS_GQL);
    const [currentFilter, setCurrentFilter] = useState(Filter.SHOW_ALL);
    const todos = data ? data.todos : [];

    const [setFilter] = useMutation(SET_FILTER_GQL, {
        refetchQueries: [{query: ALL_TODOS_GQL}]
    });

    const activeTodoCount = todos.reduce((accum: number, todo: ITodo) =>
            todo.completed ? accum : accum + 1
        , 0);

    const completedCount = todos.length - activeTodoCount;

    const updateFilter = (todoFilter: Filter) => {
        setCurrentFilter(todoFilter);
        setFilter({variables: {filter: todoFilter}});
    };

    return (
        <>
            <div>
                <header className='header'>
                    <h1>todos</h1>
                    <AddTodo/>
                </header>
                <TodoList/>
                <Footer
                    count={activeTodoCount}
                    completedCount={completedCount}
                    currentFilter={currentFilter}
                    updateFilter={updateFilter}
                />
            </div>
        </>
    );
}

export default App;
