import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ITodo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {
  }

  fetch() {
    return this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  delete(id: number) {
    return this.http.delete('https://jsonplaceholder.typicode.com/todos/' + id);
  }

  add(payload: ITodo) {
    return this.http.post<ITodo>('https://jsonplaceholder.typicode.com/todos', payload);
  }

  update(payload: ITodo) {
    return this.http.put<ITodo>('https://jsonplaceholder.typicode.com/todos/' + payload.id, payload);
  }
}
