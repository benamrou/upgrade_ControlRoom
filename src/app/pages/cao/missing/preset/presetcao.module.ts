import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';

// Toolkit component
import { PresetCAOComponent} from './presetcao.component';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [ PresetCAOComponent],
    exports: [PresetCAOComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class PresetCAOModule { }

