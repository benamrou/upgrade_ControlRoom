import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { FixPickingUnitComponent } from './fix.picking.unit.component';


@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [FixPickingUnitComponent],
    exports: [FixPickingUnitComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class FixPickingUnitModule { }
