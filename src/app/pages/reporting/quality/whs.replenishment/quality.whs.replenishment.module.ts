import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { QualityWhsReplenishmentComponent } from './quality.whs.replenishment.component';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [QualityWhsReplenishmentComponent],
    exports: [QualityWhsReplenishmentComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class QualityWhsReplenishmentModule { }
