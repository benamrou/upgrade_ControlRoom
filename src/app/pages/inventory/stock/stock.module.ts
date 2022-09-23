import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { StockComponent } from './stock.component';


@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [StockComponent],
    exports: [StockComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class StockModule { }
