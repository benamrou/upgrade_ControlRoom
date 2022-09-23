import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { ChartComponent } from './chart.component';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [ChartComponent],
    exports: [ChartComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ChartModule { }
