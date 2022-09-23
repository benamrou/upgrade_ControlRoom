import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { MdmAttributeComponent } from './mdm.attribute.component';


@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [MdmAttributeComponent],
    exports: [MdmAttributeComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MdmAttributeModule { }
