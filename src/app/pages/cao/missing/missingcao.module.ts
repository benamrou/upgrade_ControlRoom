import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';

import { PresetCAOModule } from './preset/presetcao.module';


// Toolkit component
import { MissingCAOComponent} from './missingcao.component';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule, 
               PresetCAOModule],
    declarations: [ MissingCAOComponent],
    exports: [MissingCAOComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MissingCAOModule { }

