import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { InquiryComponent } from './inquiry.component';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [InquiryComponent],
    exports: [InquiryComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class InquiryModule { }
