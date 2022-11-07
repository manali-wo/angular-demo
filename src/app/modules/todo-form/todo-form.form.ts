import { FormControl, FormGroup } from "ngx-strongly-typed-forms";
import { Validators } from "@angular/forms";

import { CustomValidators } from "../../services/form";

export interface ITodoForm {
  id: number;
  title: string;
}

export const createFormGroup = ({
                               id, title
                                }: ITodoForm): FormGroup<ITodoForm> =>
  new FormGroup<ITodoForm>(
    {
      id: new FormControl(id, [Validators.required]),
      title: new FormControl(title, CustomValidators.required),
    },
  );
