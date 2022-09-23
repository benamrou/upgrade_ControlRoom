import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { CaoConfigComponent } from './caoconfig.component';


@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [CaoConfigComponent],
    exports: [CaoConfigComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CaoConfigModule { }
