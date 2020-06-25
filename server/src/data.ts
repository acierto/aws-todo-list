export interface TodoData {
    id: number;
    title: string;
    completed: boolean;
}

export const todos: TodoData[] = [
    {id: 1, title: 'Welcome!', completed: false}
];
