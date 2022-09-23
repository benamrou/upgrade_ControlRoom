import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { WarehouseComponent } from './warehouse.component';


@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [WarehouseComponent],
    exports: [WarehouseComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class WarehouseModule { }
