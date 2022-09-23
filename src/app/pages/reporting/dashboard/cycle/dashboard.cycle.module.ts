import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { DashboardCycleComponent } from './dashboard.cycle.component';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [DashboardCycleComponent],
    exports: [DashboardCycleComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DashboardCycleModule { }
