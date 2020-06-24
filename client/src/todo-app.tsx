import * as React from 'react';
import {Router} from 'director/build/director';
import {TodoFooter} from './footer';
import {TodoItem} from './todo-item';
import {ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS, ENTER_KEY} from './constants';

class TodoApp extends React.Component<IAppProps, IAppState> {

    private readonly newTodoRef: React.RefObject<HTMLInputElement>;
    public state: IAppState;

    constructor(props: IAppProps) {
        super(props);
        this.newTodoRef = React.createRef<HTMLInputElement>();
        this.state = {
            editing: null,
            nowShowing: ALL_TODOS
        };
    }

    public componentDidMount() {
        this.createRouter();
    }

    createRouter = () => {
        const router = Router({
            '/': () => this.setState({nowShowing: ALL_TODOS}),
            '/active': () => this.setState({nowShowing: ACTIVE_TODOS}),
            '/completed': () => this.setState({nowShowing: COMPLETED_TODOS})
        });
        router.init('/');
    };

    handleNewTodoKeyDown = (event: React.KeyboardEvent) => {
        if (event.keyCode !== ENTER_KEY) {
            return;
        }

        event.preventDefault();

        const {current} = this.newTodoRef;
        if (current) {
            const val = current.value.trim();
            if (val) {
                this.props.model.addTodo(val);
                current.value = '';
            }
        }
    }

    toggleAll = (event: React.FormEvent) => {
        const target: any = event.target;
        const checked = target.checked;
        this.props.model.toggleAll(checked);
    };

    toggle = (todoToToggle: ITodo) => {
        this.props.model.toggle(todoToToggle);
    };

    destroy = (todo: ITodo) => {
        this.props.model.destroy(todo);
    };

    edit = (todo: ITodo) => {
        this.setState({editing: todo.id});
    };

    save = (todoToSave: ITodo, text: string) => {
        this.props.model.save(todoToSave, text);
        this.setState({editing: null});
    };

    cancel = () => {
        this.setState({editing: null});
    };

    clearCompleted = () => {
        this.props.model.clearCompleted();
    };

    render = () => {
        let footer;
        let main;
        const todos = this.props.model.todos;

        const shownTodos = todos.filter((todo) => {
            switch (this.state.nowShowing) {
                case ACTIVE_TODOS:
                    return !todo.completed;
                case COMPLETED_TODOS:
                    return todo.completed;
                default:
                    return true;
            }
        });

        const todoItems = shownTodos.map((todo) => {
            return (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={this.toggle.bind(this, todo)}
                    onDestroy={this.destroy.bind(this, todo)}
                    onEdit={this.edit.bind(this, todo)}
                    editing={this.state.editing === todo.id}
                    onSave={this.save.bind(this, todo)}
                    onCancel={this.cancel}
                />
            );
        });

        const activeTodoCount = todos.reduce((accum, todo) =>
                todo.completed ? accum : accum + 1
            , 0);

        const completedCount = todos.length - activeTodoCount;

        if (activeTodoCount || completedCount) {
            footer =
                <TodoFooter
                    count={activeTodoCount}
                    completedCount={completedCount}
                    nowShowing={this.state.nowShowing}
                    onClearCompleted={this.clearCompleted}
                />;
        }

        if (todos.length) {
            main = (
                <section className='main'>
                    <input
                        id='toggle-all'
                        className='toggle-all'
                        type='checkbox'
                        onChange={this.toggleAll}
                        checked={activeTodoCount === 0}
                    />
                    <label
                        htmlFor='toggle-all'
                    >
                        Mark all as complete
                    </label>
                    <ul className='todo-list'>
                        {todoItems}
                    </ul>
                </section>
            );
        }

        return (
            <div>
                <header className='header'>
                    <h1>todos</h1>
                    <input
                        autoFocus={true}
                        className='new-todo'
                        onKeyDown={this.handleNewTodoKeyDown}
                        placeholder='What needs to be done?'
                        ref={this.newTodoRef}
                    />
                </header>
                {main}
                {footer}
            </div>
        );
    };
}

export default TodoApp;
