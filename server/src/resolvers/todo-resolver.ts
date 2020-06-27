import {Arg, Mutation, Query, Resolver} from 'type-graphql';
import {Guid} from 'guid-typescript';
import {Filter, params, TodoData} from '../data';
import Todo from '../schemas/todo';
import {findTodo, listTodos, removeTodo, saveTodo, updateTodo} from '../database/database';

@Resolver(_ => Todo)
export default class {
    @Query(_ => [Todo])
    async todos(): Promise<TodoData[]> {
        const todos = await listTodos();
        if (params.filter === Filter.SHOW_COMPLETED) {
            return todos.filter(t => t.completed);
        }

        if (params.filter === Filter.SHOW_ACTIVE) {
            return todos.filter(t => !t.completed);
        }

        return todos;
    }

    @Query(_ => [Todo], {nullable: true})
    async todoByID(@Arg('id') id: string): Promise<TodoData | undefined> {
        return findTodo(id);
    }

    @Mutation(_ => Todo)
    async addTodo(@Arg('title') title: string): Promise<TodoData> {
        const todo = {
            id: Guid.create().toString(),
            title,
            completed: false
        };
        await saveTodo(todo);
        return todo;
    }

    @Mutation(_ => Boolean)
    async removeTodo(@Arg('id') id: string): Promise<boolean> {
        await removeTodo(id);
        return true;
    }

    @Mutation(_ => Todo)
    async toggleTodo(@Arg('id') id: string): Promise<TodoData> {
        const todo: TodoData = await findTodo(id);
        const updatedTodo = {...todo, completed: !todo.completed};
        updateTodo(updatedTodo);
        return updatedTodo;
    }

    @Mutation(_ => Todo)
    async modifyTodo(@Arg('id') id: string, @Arg('title') title: string): Promise<TodoData> {
        const todo: TodoData = await findTodo(id);
        const updatedTodo = {...todo, title};
        updateTodo(updatedTodo);
        return updatedTodo;
    }

    @Mutation(_ => Filter)
    setFilter(@Arg('filter') todoFilter: Filter): Filter {
        params.filter = todoFilter;
        return todoFilter;
    }
}
