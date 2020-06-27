interface ITodo {
  id: number,
  title: string,
  completed: boolean
}

interface ITodoItemProps {
  key : number,
  todo : ITodo;
  editing? : boolean;
  onSave: (id: number, title: string) => void;
  onDestroy: () => void;
  onEdit: ()  => void;
  onCancel: (event : any) => void;
  onToggle: () => void;
}

interface ITodoItemState {
  editText : string
}

interface ITodoFooterProps {
  completedCount : number;
  nowShowing? : string;
  count : number;
}

interface ITodoModel {
  key : any;
  todos : ITodo[];
  onChanges : any[];
  subscribe(onChange);
  inform();
  addTodo(title : string);
  toggleAll(checked);
  toggle(todoToToggle);
  destroy(todo);
  save(todoToSave, text);
  clearCompleted();
}

interface IAppProps {
  model : ITodoModel;
}

interface IAppState {
  editing? : string | null;
  nowShowing? : string
}
