import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [DashboardComponent],
    exports: [DashboardComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DashboardModule { }
