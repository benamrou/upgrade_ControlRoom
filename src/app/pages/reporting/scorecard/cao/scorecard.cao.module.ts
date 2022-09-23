import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { ScorecardCAOComponent } from './scorecard.cao.component';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule ],
    declarations: [ScorecardCAOComponent],
    exports: [ScorecardCAOComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ScorecardCAOModule { }
