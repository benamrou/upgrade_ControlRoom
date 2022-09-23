import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { MyBatchListComponent } from './mybatch.list.component';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [MyBatchListComponent],
    exports: [MyBatchListComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MyBatchListModule { }
