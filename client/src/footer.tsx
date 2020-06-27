import classNames from 'classnames';
import * as React from 'react';
import {Filter} from './constants';
import {Router} from 'director/build/director';
import {useEffect} from 'react';

interface IProps {
    completedCount: number;
    count: number;
    currentFilter: Filter;
    updateFilter: (filter: Filter) => void;
}

export const Footer: React.FC<IProps> = ({count, completedCount, currentFilter, updateFilter}): JSX.Element => {
    let clearButton;

    useEffect(() => {
        const router = Router({
            '/': () => updateFilter(Filter.SHOW_ALL),
            '/active': () => updateFilter(Filter.SHOW_ACTIVE),
            '/completed': () => updateFilter(Filter.SHOW_COMPLETED)
        }, []);

        router.init('/');
    }, []);

    const activeTodoWord = count === 1 ? 'item' : 'items';

    if (completedCount > 0) {
        const clear = () => updateFilter(Filter.SHOW_ALL);
        clearButton = (
            <button
                className='clear-completed'
                onClick={clear}>
                Clear completed
            </button>
        );
    }

    return (
        <footer className='footer'>
                <span className='todo-count'>
                  <strong>{count}</strong> {activeTodoWord} left
                </span>
            <ul className='filters'>
                <li>
                    <a
                        href='#/'
                        className={classNames({selected: currentFilter === Filter.SHOW_ALL})}>
                        All
                    </a>
                </li>
                {' '}
                <li>
                    <a
                        href='#/active'
                        className={classNames({selected: currentFilter === Filter.SHOW_ACTIVE})}>
                        Active
                    </a>
                </li>
                {' '}
                <li>
                    <a
                        href='#/completed'
                        className={classNames({selected: currentFilter === Filter.SHOW_COMPLETED})}>
                        Completed
                    </a>
                </li>
            </ul>
            {clearButton}
        </footer>
    );
}
