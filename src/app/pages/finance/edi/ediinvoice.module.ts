import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { EDIInvoiceComponent } from './ediinvoice.component';


@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [EDIInvoiceComponent],
    exports: [EDIInvoiceComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class EDIInvoiceModule { }
