import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";

import { ITodoState } from './todo.model';
import { TodoAction } from './todo.action';
import { TodoService } from './todo.service';
import { STATE_NAME } from "./todo.constant";

@State<ITodoState>({
  name: STATE_NAME,
})

@Injectable()
export class TodoState {
  constructor(private todoService: TodoService) {
  }

  @Selector()
  static todos(state: ITodoState) {
    return state.todos;
  }

  @Selector()
  static selectedTodo(state: ITodoState) {
    return state.selectedTodo;
  }

  @Action(TodoAction.Get)
  Get({getState, setState}: StateContext<ITodoState>) {
    return this.todoService.fetch().pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        todos: result,
      });
    }));
  }

  @Action(TodoAction.Add)
  Add({getState, patchState}: StateContext<ITodoState>, { payload }: TodoAction.Add) {
    return this.todoService.add(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
        todos: [...state.todos, result]
      });
    }));
  }

  @Action(TodoAction.Update)
  Update({getState, setState}: StateContext<ITodoState>, { payload }: TodoAction.Update) {
    return this.todoService.update(payload).pipe(tap((result) => {
      const state = getState();
      const todoList = [...state.todos];
      const todoIndex = todoList.findIndex(item => item.id === payload.id);
      todoList[todoIndex] = result;
      setState({
        ...state,
        todos: todoList,
      });
    }));
  }


  @Action(TodoAction.Delete)
  Delete({getState, setState}: StateContext<ITodoState>, { id }: TodoAction.Delete) {
    return this.todoService.delete(id).pipe(tap(() => {
      const state = getState();
      const filteredArray = state.todos.filter(item => item.id !== id);
      setState({
        ...state,
        todos: filteredArray,
      });
    }));
  }

  @Action(TodoAction.Set)
  Set({getState, setState}: StateContext<ITodoState>, { payload }: TodoAction.Set) {
    const state = getState();
    setState({
      ...state,
      selectedTodo: payload
    });
  }
}
