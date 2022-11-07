import { AbstractControl, FormGroup, FormArray as _FormArray } from 'ngx-strongly-typed-forms';
import { defer, EMPTY, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { cloneDeep, isNumber } from 'lodash-es';
import { ValidationErrors } from '@angular/forms';

import { IFormArrayOptions } from './form.model';
import { trimDeep } from "../../shared/utils/common";

export class FormArray<T> {
    private formArray: _FormArray<T>;
    private DEFAULT_FORM_GROUPS_CREATED = 1;

    isSubmitted = false;
    isSubmitting = false;

    constructor(
        public formGroup: FormGroup<T>,
        private action: (formValue: T[]) => Observable<T[]>,
        private options: IFormArrayOptions<T>
    ) {
        this.create();
    }

    get controls(): AbstractControl<T>[] {
        return this.formArray.controls;
    }

    get formValue(): T[] {
        return this.formArray.value;
    }

    get rawValue(): T[] {
        return this.formArray.getRawValue();
    }

    get valid(): boolean {
        return this.formArray.valid;
    }

    get invalid(): boolean {
        return this.formArray.invalid;
    }

    get dirty(): boolean {
        return this.formArray?.dirty;
    }

    submit(): Observable<T[]> {
        this.markAllAsDirty();

        return defer(() => {
            const isValid = this.options?.customValidator() || this.valid;

            if (this.isSubmitting || !isValid) {
                return EMPTY;
            }

            this.trimDeepValue();
            this.clearErrors();
            this.isSubmitting = true;

            return this.action(this.formValue).pipe(finalize(() => (this.isSubmitting = false)));
        });
    }

    get(control: AbstractControl<T>): T {
        return control.value;
    }

    add(value?: Partial<T>) {
        if (value) {
            this.formGroup.patchValue(value);
        }

        this.formArray.push(cloneDeep(this.formGroup));
    }

    update(value: T[]) {
        this.formArray.patchValue(value);
    }

    updateAt(index: number, value: Partial<T>) {
        this.formArray.markAsDirty();
        this.formArray.controls[index]?.patchValue(value);
    }

    removeAt(index: number) {
        this.controls[index]?.markAsDirty();
        this.formArray.removeAt(index);

        if (this.options?.defaultFormGroupsCreated) {
            this.createFormGroups(this.options?.defaultFormGroupsCreated - this.formValue?.length).forEach((entity) =>
                this.formArray.push(entity)
            );
        }
    }

    setError(index: number, controlName: keyof T, error: ValidationErrors) {
        const formControl = this.controls[index];
        const control = formControl.get(controlName);

        control?.setErrors(error);
    }

    hasError(index: number, controlName: keyof T): ValidationErrors {
        const formControl = this.controls[index];
        const control = formControl.get(controlName);
        const isErrorShown = control?.invalid && control?.dirty;

        return isErrorShown && control?.errors;
    }

    clear() {
        this.formArray['clear']();
    }

    reset(value?: T[]) {
        this.isSubmitting = false;
        this.formArray.reset(value);
    }

    disable() {
        this.formArray.disable();
    }

    enable() {
        this.formArray.enable();
    }

    private create() {
        const defaultValue = this.options?.defaultValue || [];

        const defaultFormGroupsCreated = isNumber(this.options?.defaultFormGroupsCreated)
            ? this.options?.defaultFormGroupsCreated
            : this.DEFAULT_FORM_GROUPS_CREATED;

        const DEFAULT_FORM_GROUPS_CREATED =
            defaultFormGroupsCreated > defaultValue?.length ? defaultFormGroupsCreated : defaultValue?.length;

        this.formArray = new _FormArray(this.createFormGroups(DEFAULT_FORM_GROUPS_CREATED, defaultValue));
    }

    private createFormGroups(amount: number, defaultValue: T[] = []): AbstractControl<T>[] {
        return Array.from({ length: amount }).map((_, index: number) => {
            const formGroup = cloneDeep(this.formGroup);
            const formValue = defaultValue?.[index];

            if (formValue) {
                formGroup.patchValue(formValue);
            }

            return formGroup as AbstractControl<T>;
        });
    }

    trimDeepValue(formValue = this.formValue) {
        this.update(formValue.map(trimDeep) as T[]);
    }

    markAllAsDirty() {
        this.modifyControls((field) => field?.markAsDirty());
    }

    private clearErrors() {
        this.modifyControls((field) => field?.setErrors(null));
    }

    private modifyControls(callback: (field: AbstractControl<T[keyof T]>) => void) {
        this.controls.forEach((control) => {
            const formGroup = control as FormGroup<T>;
            const fields = Object.keys(formGroup?.controls);

            if (fields?.length) {
                fields.forEach((field) => callback(formGroup.get(field as keyof T)));
            }
        });
    }
}
