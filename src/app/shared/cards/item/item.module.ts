import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { ItemComponent } from './item.component';
import { TableModule } from 'primeng/table';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule,TableModule ],
    declarations: [ItemComponent],
    exports: [ItemComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ItemModule { }
