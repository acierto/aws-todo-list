import classNames from 'classnames';
import * as React from 'react';
import {ENTER_KEY, ESCAPE_KEY} from './constants';

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {

    private readonly editFieldRef: React.RefObject<HTMLInputElement>;
    public state: ITodoItemState;

    constructor(props: ITodoItemProps) {
        super(props);
        this.editFieldRef = React.createRef<HTMLInputElement>();
        this.state = {editText: this.props.todo.title};
    }

    handleSubmit = () => {
        const val = this.state.editText.trim();
        if (val) {
            this.props.onSave(this.props.todo.id, val);
            this.setState({editText: val});
        } else {
            this.props.onDestroy();
        }
    };

    handleEdit = () => {
        this.props.onEdit();
        this.setState({editText: this.props.todo.title});
    };

    handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.keyCode === ESCAPE_KEY) {
            this.setState({editText: this.props.todo.title});
            this.props.onCancel(event);
        } else if (event.keyCode === ENTER_KEY) {
            this.handleSubmit();
        }
    };

    handleChange = (event: React.FormEvent) => {
        const input: any = event.target;
        this.setState({editText: input.value});
    };

    shouldComponentUpdate = (nextProps: ITodoItemProps, nextState: ITodoItemState) =>
        nextProps.todo !== this.props.todo ||
        nextProps.editing !== this.props.editing ||
        nextState.editText !== this.state.editText;


    componentDidUpdate = (prevProps: ITodoItemProps) => {
        if (!prevProps.editing && this.props.editing) {
            const node = this.editFieldRef.current;
            if (node != null) {
                node.focus();
                node.setSelectionRange(node.value.length, node.value.length);
            }
        }
    };

    render = () =>
        <li className={classNames({
            completed: this.props.todo.completed,
            editing: this.props.editing
        })}>
            <div className='view'>
                <input
                    className='toggle'
                    type='checkbox'
                    checked={this.props.todo.completed}
                    onChange={this.props.onToggle}
                />
                <label onDoubleClick={this.handleEdit}>
                    {this.props.todo.title}
                </label>
                <button className='destroy' onClick={this.props.onDestroy}/>
            </div>
            <input
                className='edit'
                ref={this.editFieldRef}
                value={this.state.editText}
                onBlur={this.handleSubmit}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
            />
        </li>;
}

export {TodoItem};
