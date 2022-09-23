import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageHeaderComponent } from './page-header.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [PageHeaderComponent],
    exports: [PageHeaderComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageHeaderModule {}

