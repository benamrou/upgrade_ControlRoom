import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { MassJournalComponent } from './massjournal.component';


@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [MassJournalComponent],
    exports: [MassJournalComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MassJournalModule { }
