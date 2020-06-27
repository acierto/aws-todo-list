import {Arg, Mutation, Query, Resolver} from 'type-graphql';
import {Filter, params, TodoData} from '../data';
import Todo from '../schemas/todo';

@Resolver(_ => Todo)
export default class {
    @Query(_ => Todo)
    todos(): TodoData[] {
        const {todos} = params;
        if (params.filter === Filter.SHOW_COMPLETED) {
            return todos.filter(t => t.completed);
        }

        if (params.filter === Filter.SHOW_ACTIVE) {
            return todos.filter(t => !t.completed);
        }

        return todos;
    }

    @Query(_ => Todo, {nullable: true})
    todoByID(@Arg('id') id: string): TodoData | undefined {
        return params.todos.find(todo => todo.id === id);
    }

    @Mutation(_ => Todo)
    addTodo(@Arg('title') title: string): TodoData[] {
        const {todos} = params;
        const id = `${todos.length + 1}`;
        todos.push({
            id,
            title,
            completed: false
        })
        return todos;
    }

    @Mutation(_ => Todo)
    removeTodo(@Arg('id') id: string): TodoData[] {
        const {todos} = params;
        params.todos = todos.filter((todo) => todo.id !== id);
        return params.todos;
    }

    @Mutation(_ => Todo)
    toggleTodo(@Arg('id') id: string): TodoData[] {
        const {todos} = params;
        params.todos = todos.map((todo: TodoData) => todo.id === id ? {...todo, completed: !todo.completed} : todo);
        return params.todos;
    }

    @Mutation(_ => Todo)
    modifyTodo(@Arg('id') id: string, @Arg('title') title: string): TodoData[] {
        const {todos} = params;
        params.todos = todos.map((todo: TodoData) => todo.id === id ? {...todo, title} : todo);
        return params.todos;
    }

    @Mutation(_ => Filter)
    setFilter(@Arg('filter') todoFilter: Filter): Filter {
        params.filter = todoFilter;
        return todoFilter;
    }
}
