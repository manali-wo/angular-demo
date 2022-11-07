import { NgxsModule } from '@ngxs/store';
import { NgModule } from '@angular/core';

import { TodoState } from "./todo.state";
import { TodoFacade } from "./todo.facade";

@NgModule({
  imports: [NgxsModule.forFeature([TodoState])],
  providers: [TodoFacade],
})
export class TodoStateModule {}
