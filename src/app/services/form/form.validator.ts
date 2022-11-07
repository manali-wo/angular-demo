import { AbstractControl } from 'ngx-strongly-typed-forms';

type ValidationErrors = { [key: string]: boolean } | null;

export const CustomValidators = {
    required: (control: AbstractControl<string>): ValidationErrors =>
        !control?.value?.trim()?.length ? { required: true } : null,
};
