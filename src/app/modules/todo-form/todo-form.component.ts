import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { tap } from "rxjs/operators";

import { TodoFacade } from "../../@states/Todo/todo.facade";
import { createFormGroup, ITodoForm } from "./todo-form.form";
import { Form, FormFactory } from "../../services/form";

@Component({
    selector: 'app-todo-form',
    templateUrl: './todo-form.component.html',
    styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {

  selectedTodo$ = this.todoFacade.selectedTodo$;

  form: Form<ITodoForm> | any;
  editTodo = false;

  constructor(private fb: FormBuilder,
              private todoFacade: TodoFacade,
              private formFactory: FormFactory
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.selectedTodo$.pipe(tap(todo => {
      if (todo) {
        this.form.update({
          id: todo.id,
          title: todo.title
        });
        this.editTodo = true;
      } else {
        this.editTodo = false;
      }
    })).subscribe();
  }

  createForm() {
    this.form = this.formFactory.create<ITodoForm>({
      formGroup: createFormGroup({
        id: 1,
        title: '',
      }),
      action: (formValue) => this.editTodo ? this.todoFacade.update(formValue) : this.todoFacade.add(formValue)
    });
  }

  onSubmit() {
    this.form.trimFormValue();
    this.form
      .submit()
      .subscribe(() => this.clearForm());
  }

  clearForm() {
    this.form.reset();
    this.todoFacade.set(null);
  }
}
