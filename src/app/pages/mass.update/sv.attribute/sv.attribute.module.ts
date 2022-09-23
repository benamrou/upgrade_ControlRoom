import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { SVAttributeComponent } from './sv.attribute.component';


@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [SVAttributeComponent],
    exports: [SVAttributeComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SVAttributeModule { }
