import { ValidationErrors } from '@angular/forms';
import { Controls, FormGroup } from 'ngx-strongly-typed-forms';
import { defer, EMPTY, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { trimDeep } from "../../shared/utils/common";

export class Form<T> {
    defaultValue: T;
    isSubmitted = false;
    isSubmitting = false;

    constructor(public formGroup: FormGroup<T>, private action: (formValue: T) => Observable<T>) {
        this.defaultValue = this.formGroup?.value;
    }

    get formValue(): T {
        return this.formGroup.value;
    }

    get rawValue(): T {
        return this.formGroup.getRawValue();
    }

    get controls(): Controls<T> {
        return this.formGroup.controls;
    }

    get valid(): boolean {
        return this.formGroup.valid;
    }

    get invalid(): boolean {
        return this.formGroup.invalid;
    }

    get dirty(): boolean {
        return this.formGroup.dirty;
    }

    get pristine(): boolean {
        return this.formGroup.pristine;
    }

    submit(): Observable<T> {
        this.isSubmitted = true;

        return defer(() => {
            if (this.isSubmitting || this.invalid) {
                return EMPTY;
            }

            // Trim form value before form submitted.
            this.trimFormValue();
            this.isSubmitting = true;

            return this.action(this.formValue).pipe(finalize(() => (this.isSubmitting = false)));
        });
    }

    update(value: Partial<T>) {
        this.formGroup.patchValue(value);
    }

    setError(controlName: keyof T, error: ValidationErrors) {
        const control = this.formGroup.controls[controlName];

        control.setErrors(error);
    }

    hasError(controlName: keyof T): ValidationErrors {
        const control = this.formGroup.controls[controlName];
        const isErrorShown = (control?.invalid && control?.dirty) || this.isSubmitted;

        return isErrorShown && control?.errors;
    }

    reset(value: T = this.defaultValue) {
        this.isSubmitted = false;
        this.isSubmitting = false;
        this.formGroup.reset(value);
    }

    disable() {
        this.formGroup.disable();
    }

    enable() {
        this.formGroup.enable();
    }

    trimFormValue(formValue = this.formValue) {
        this.update(trimDeep<T>(formValue));
    }
}
