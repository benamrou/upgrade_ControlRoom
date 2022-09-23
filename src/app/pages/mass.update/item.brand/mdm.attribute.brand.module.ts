import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { MdmAttributeBrandComponent } from './mdm.attribute.brand.component';


@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [MdmAttributeBrandComponent],
    exports: [MdmAttributeBrandComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MdmAttributeBrandModule { }
