export interface ITodo {
  id: number;
  title: string;
  completed?: boolean;
}

export interface ITodoState {
  todos: ITodo[];
  selectedTodo: ITodo | null;
}
