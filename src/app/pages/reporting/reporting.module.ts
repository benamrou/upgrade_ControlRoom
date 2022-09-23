import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { ReportingComponent } from './reporting.component';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [ReportingComponent],
    exports: [ReportingComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ReportingModule { }
