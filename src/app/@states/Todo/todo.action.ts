import { ITodo } from './todo.model';
import { STATE_NAME } from "./todo.constant";

export namespace TodoAction {
  export class Add {
    static readonly type = `[${STATE_NAME}] Add`;

    constructor(public payload: ITodo) {
    }
  }

  export class Get {
    static readonly type = `[${STATE_NAME}] Get`;
  }

  export class Update {
    static readonly type = `[${STATE_NAME}] Update`;

    constructor(public payload: ITodo) {
    }
  }

  export class Delete {
    static readonly type = `[${STATE_NAME}] Delete`;

    constructor(public id: number) {
    }
  }

  export class Set {
    static readonly type = `[${STATE_NAME}] Set`;

    constructor(public payload: ITodo | null) {
    }
  }
}
