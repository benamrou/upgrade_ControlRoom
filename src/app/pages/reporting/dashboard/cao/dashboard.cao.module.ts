import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { DashboardCAOComponent } from './dashboard.cao.component';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [DashboardCAOComponent],
    exports: [DashboardCAOComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DashboardCAOModule { }
