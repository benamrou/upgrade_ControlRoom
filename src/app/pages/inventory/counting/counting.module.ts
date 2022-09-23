import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { CountingComponent } from './counting.component';


@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [CountingComponent],
    exports: [CountingComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CountingModule { }
