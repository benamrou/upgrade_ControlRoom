import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './shared/services';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** Component */
//import { StatModule } from './shared';
import { ChartModule } from './shared';

/** Import app module */
import { LoginModule } from './pages/login/login.module';
/*import { ServerErrorModule } from './pages/server-error/server-error.module';
import { NotAccessibleModule } from './pages/not-accessible/not-accessible.module';
import { NotFoundModule} from './pages/not-found/not-found.module';
import { GridsterModule } from './shared';
import { FilterModule } from './shared/';
import { ExportModule } from './shared/';
import { MultiSelectDropdownModule } from './shared/';  
import { ItemModule, OrderModule, SupplierModule } from './shared/';  
import { PageHeaderModule } from './shared/';
import { MissingCAOModule } from './pages/cao/missing/missingcao.module';
import { PresetCAOModule } from './pages/cao/missing/preset/presetcao.module';
import { CaoConfigModule } from './pages/cao/configuration/caoconfig.module';
import { WarehouseModule } from './pages/warehouse/warehouse.module';
import { FixPickingUnitModule } from './pages/warehouse/toolkit/fix.picking.unit/fix.picking.unit.module';
import { BatchScheduleModule } from './pages/it/schedule/batch.schedule.module';
import { MyBatchListModule } from './pages/it/schedule/mybatchlist/mybatch.list.module';
import { CountingModule } from './pages/inventory/counting/counting.module';
import { StockModule } from './pages/inventory/stock/stock.module';

import { DashboardModule } from './pages/dashboard/dashboard.module';
import { EDIInvoiceModule } from './pages/finance/edi/ediinvoice.module';
import { InquiryModule } from './pages/inquiry/inquiry.module';
import { CategoryModule } from './pages/interfacing/category/category.module';
import { MdmAttributeBrandModule } from './pages/mass.update/item.brand/mdm.attribute.brand.module';
import { MdmAttributeModule } from './pages/mass.update/item.attribute/mdm.attribute.module';
import { ItemHierarchyModule } from './pages/mass.update/item.hierarchy/item.hierarchy.module';
import { MassJournalModule } from './pages/mass.update/journal/massjournal.module';
import { SVAttributeModule } from './pages/mass.update/sv.attribute/sv.attribute.module';
import { ReportingModule } from './pages/reporting/reporting.module';
import { ScorecardCAOModule } from './pages/reporting/scorecard/cao/scorecard.cao.module';
import { QualityWhsReplenishmentModule } from './pages/reporting/quality/whs.replenishment/quality.whs.replenishment.module';
import { DashboardCAOModule } from './pages/reporting/dashboard/cao/dashboard.cao.module';
import { DashboardCycleModule } from './pages/reporting/dashboard/cycle/dashboard.cycle.module';
import { DashboardSupplierModule } from './pages/reporting/dashboard/supplier/dashboard.supplier.module';
import { SupplierScheduleModule } from './pages/schedule/supplier.schedule/supplier.schedule.module';
import { SupplierScheduleServiceContractModule } from './pages/schedule/service.contract/service.contract.module';
import { SearchModule } from './pages/search/search.module';*/


/* Prime NG */
import { MessageModule} from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule} from 'primeng/button';
import { ChipsModule} from 'primeng/chips';
import { InputNumberModule } from 'primeng/inputnumber'
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { TreeModule } from 'primeng/tree';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    /* Prime NG */
    ToastModule,
    MessageModule,
    TableModule,MultiSelectModule,
    ButtonModule, ChipsModule, 
    InputNumberModule,
    TabViewModule, DialogModule, FullCalendarModule,SelectButtonModule,
    TooltipModule, PanelModule, CalendarModule,TreeModule,DropdownModule,
    /** BBS */
/*    PageHeaderModule,
    GridsterModule, FilterModule, ExportModule, MultiSelectDropdownModule,
    ItemModule, OrderModule, SupplierModule,StatModule,ChartModule,

    LoginModule,ServerErrorModule, NotAccessibleModule, NotFoundModule,
    WarehouseModule,
    FixPickingUnitModule,
    BatchScheduleModule, MyBatchListModule,
    CountingModule, StockModule,

    DashboardModule,
    EDIInvoiceModule,
    MissingCAOModule, PresetCAOModule, CaoConfigModule,
    InquiryModule,
    CategoryModule,
    CountingModule,
    StockModule,
    MdmAttributeBrandModule,
    MdmAttributeModule,
    ItemHierarchyModule,
    MassJournalModule,
    ReportingModule,
    ScorecardCAOModule,
    QualityWhsReplenishmentModule,
    DashboardCAOModule,
    DashboardCycleModule,
    DashboardSupplierModule,
    SupplierScheduleModule,
    SupplierScheduleServiceContractModule,
    SearchModule,
    SVAttributeModule*/
  ],
  providers: [HttpService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
