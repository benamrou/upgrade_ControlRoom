import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { DashboardSupplierComponent } from './dashboard.supplier.component';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [DashboardSupplierComponent],
    exports: [DashboardSupplierComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DashboardSupplierModule { }
