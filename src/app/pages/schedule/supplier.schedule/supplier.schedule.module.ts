import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { SupplierScheduleComponent } from './supplier.schedule.component';


@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [SupplierScheduleComponent],
    exports: [SupplierScheduleComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SupplierScheduleModule { }
