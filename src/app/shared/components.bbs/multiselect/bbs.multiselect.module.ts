import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { MultiSelectDropdownComponent } from './bbs.multiselect.component';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [MultiSelectDropdownComponent],
    exports: [MultiSelectDropdownComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MultiSelectDropdownModule { }
