import { Component, OnInit } from '@angular/core';

import { TodoFacade } from "../../@states/Todo/todo.facade";
import { ITodo } from "../../@states/Todo/todo.model";

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {

  todos$ = this.todoFacade.todos$;

  constructor(private todoFacade: TodoFacade) {}

  ngOnInit() {
    this.todoFacade.get();
  }

  deleteTodo(id: number) {
    this.todoFacade.delete(id);
  }

  editTodo(payload: ITodo) {
    this.todoFacade.set(payload);
  }

}
