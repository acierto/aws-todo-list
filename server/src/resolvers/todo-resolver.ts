import {Arg, Mutation, Query, Resolver} from 'type-graphql';
import {TodoData, todos} from '../data';
import Todo from '../schemas/todo';
import {TodoInput} from './todo-input';

@Resolver(_ => Todo)
export default class {
    @Query(_ => Todo)
    todos(): TodoData[] {
        return todos;
    }

    @Query(_ => Todo, {nullable: true})
    todoByID(@Arg('id') id: number): TodoData | undefined {
        return todos.find(todo => todo.id === id);
    }

    @Mutation(_ => Todo)
    createTodo(@Arg('input') {title}: TodoInput): TodoData[] {
        const id = todos.length + 1;
        todos.push({
            id,
            title,
            completed: false
        })
        return todos;
    }
}
