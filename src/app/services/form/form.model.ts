import { FormGroup } from 'ngx-strongly-typed-forms';
import { Observable } from 'rxjs';

export interface IFormFactory<T> {
    formGroup: FormGroup<T>;
    action?: (formValue: T) => Observable<T>;
}

export interface IFormArrayFactory<T> {
    formGroup: FormGroup<T>;
    action?: (formValue: T[]) => Observable<T[]>;
    options?: IFormArrayOptions<T>;
}

export interface IFormArrayOptions<T> {
    defaultValue?: T[];
    defaultFormGroupsCreated?: number;
    customValidator?: () => boolean;
}
