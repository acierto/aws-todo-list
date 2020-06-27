import {registerEnumType} from 'type-graphql';

export enum Filter {
    SHOW_ALL,
    SHOW_COMPLETED,
    SHOW_ACTIVE
}

registerEnumType(Filter, {name: 'Filter'});

export interface TodoData {
    id: string;
    title: string;
    completed: boolean;
}

const todos: TodoData[] = [
    {id: '1', title: 'Welcome!', completed: false}
];

export let params = {filter: Filter.SHOW_ALL, todos};
