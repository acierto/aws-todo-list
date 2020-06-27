import {Arg, Mutation, Query, Resolver} from 'type-graphql';
import {Filter, params, TodoData, todos} from '../data';
import Todo from '../schemas/todo';

@Resolver(_ => Todo)
export default class {
    @Query(_ => Todo)
    todos(): TodoData[] {
        if (params.filter === Filter.SHOW_COMPLETED) {
            return todos.filter(t => t.completed);
        }

        if (params.filter === Filter.SHOW_ACTIVE) {
            return todos.filter(t => !t.completed);
        }

        return todos;
    }

    @Query(_ => Todo, {nullable: true})
    todoByID(@Arg('id') id: number): TodoData | undefined {
        return todos.find(todo => todo.id === id);
    }

    @Mutation(_ => Todo)
    addTodo(@Arg('title') title: string): TodoData[] {
        const id = todos.length + 1;
        todos.push({
            id,
            title,
            completed: false
        })
        return todos;
    }

    @Mutation(_ => Filter)
    setFilter(@Arg('filter') todoFilter: Filter): Filter {
        params.filter = todoFilter;
        return todoFilter;
    }
}
