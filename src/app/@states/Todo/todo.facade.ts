import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";

import { TodoAction } from "./todo.action";
import { ITodo } from "./todo.model";
import { TodoState } from "./todo.state";

@Injectable()
export class TodoFacade {

  todos$: Observable<ITodo[]> = this.store.select(TodoState.todos);
  selectedTodo$: Observable<ITodo | null> = this.store.select(TodoState.selectedTodo);

  constructor(private store: Store) {}

  add(payload: ITodo) {
    return this.store.dispatch(new TodoAction.Add(payload));
  }

  get() {
    return this.store.dispatch(new TodoAction.Get());
  }

  update(payload: ITodo) {
    return this.store.dispatch(new TodoAction.Update(payload));
  }

  delete(id: number) {
    return this.store.dispatch(new TodoAction.Delete(id));
  }

  set(payload: ITodo | null) {
    return this.store.dispatch(new TodoAction.Set(payload));
  }
}
