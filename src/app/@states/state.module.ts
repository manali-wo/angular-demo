import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { environment } from "../../environments";

@NgModule({
    imports: [
        NgxsModule.forRoot([], { developmentMode: !environment.production }),
        NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    ],
})
export class StateModule {}
