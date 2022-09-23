import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { SearchComponent } from './search.component';


@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [SearchComponent],
    exports: [SearchComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SearchModule { }
