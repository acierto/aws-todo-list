import {Utils} from './utils';

class TodoModel implements ITodoModel {

    public key: string;
    public todos: ITodo[];
    public onChanges: any[];

    constructor(key: string) {
        this.key = key;
        this.todos = Utils.store(key);
        this.onChanges = [];
    }

    public subscribe(onChange: any) {
        this.onChanges.push(onChange);
    }

    public inform() {
        Utils.store(this.key, this.todos);
        this.onChanges.forEach((cb) => cb());
    }

    public addTodo(title: string) {
        this.todos = this.todos.concat({
            id: Utils.uuid(),
            title,
            completed: false
        });

        this.inform();
    }

    public toggleAll(checked: boolean) {
        // Note: It's usually better to use immutable data structures since they're
        // easier to reason about and React works very well with them. That's why
        // we use map(), filter() and reduce() everywhere instead of mutating the
        // array or todo items themselves.
        this.todos = this.todos.map<ITodo>((todo: ITodo) => {
            return {...todo, completed: checked};
        });

        this.inform();
    }

    public toggle(todoToToggle: ITodo) {
        this.todos = this.todos.map<ITodo>((todo: ITodo) => {
            return todo !== todoToToggle ? todo : {...todo, completed: !todo.completed};
        });

        this.inform();
    }

    public destroy(todo: ITodo) {
        this.todos = this.todos.filter((candidate) => candidate !== todo);
        this.inform();
    }

    public save(todoToSave: ITodo, text: string) {
        this.todos = this.todos.map((todo) =>
            todo !== todoToSave ? todo : {...todo, title: text});
        this.inform();
    }

    public clearCompleted() {
        this.todos = this.todos.filter((todo) => !todo.completed);
        this.inform();
    }
}

export {TodoModel};
