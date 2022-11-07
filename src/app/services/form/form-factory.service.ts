import { Injectable } from '@angular/core';

import { Form } from './form';
import { FormArray } from './form-array';
import { IFormArrayFactory, IFormFactory } from './form.model';

@Injectable({
    providedIn: 'root',
})
export class FormFactory {
    create<T>({ formGroup, action }: IFormFactory<T>) {
        return new Form(formGroup, action);
    }

   createFormArray<T>({ formGroup, action, options }: IFormArrayFactory<T>) {
        return new FormArray(formGroup, action, options);
    }
}
