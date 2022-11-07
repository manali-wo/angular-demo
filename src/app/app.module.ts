import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { AppComponent } from './app.component';
import { TodoStateModule } from "./@states/Todo/todo.module";
import { TodoFormComponent } from "./modules/todo-form/todo-form.component";
import { TodoListComponent } from "./modules/todo-list/todo-list.component";

@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    //states
    TodoStateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
