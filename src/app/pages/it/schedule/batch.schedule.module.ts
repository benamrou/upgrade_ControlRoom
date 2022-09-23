import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { BatchScheduleComponent } from './batch.schedule.component';


@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [BatchScheduleComponent],
    exports: [BatchScheduleComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BatchScheduleModule { }
