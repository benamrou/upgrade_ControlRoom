import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { ItemHierarchyComponent } from './item.hierarchy.component';


@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [ItemHierarchyComponent],
    exports: [ItemHierarchyComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ItemHierarchyModule { }
