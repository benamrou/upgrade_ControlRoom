import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Component */
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CaoConfigComponent } from './pages/cao/configuration/caoconfig.component';
import { EDIInvoiceComponent } from './pages/finance/edi/ediinvoice.component';
import { InquiryComponent } from './pages/inquiry/inquiry.component';
import { CategoryComponent } from './pages/interfacing/category/category.component';
import { CountingComponent } from './pages/inventory/counting/counting.component';
import { StockComponent } from './pages/inventory/stock/stock.component';
import { BatchScheduleComponent } from './pages/it/schedule/batch.schedule.component';
import { MyBatchListComponent } from './pages/it/schedule/mybatchlist/mybatch.list.component';
import { MdmAttributeBrandComponent } from './pages/mass.update/item.brand/mdm.attribute.brand.component';
import { MdmAttributeComponent } from './pages/mass.update/item.attribute/mdm.attribute.component';
import { ItemHierarchyComponent } from './pages/mass.update/item.hierarchy/item.hierarchy.component';
import { MassJournalComponent } from './pages/mass.update/journal/massjournal.component';
import { SVAttributeComponent } from './pages/mass.update/sv.attribute/sv.attribute.component';
import { NotAccessibleComponent } from './pages/not-accessible/not-accessible.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ReportingComponent } from './pages/reporting/reporting.component';
import { ScorecardCAOComponent } from './pages/reporting/scorecard/cao/scorecard.cao.component';
import { QualityWhsReplenishmentComponent } from './pages/reporting/quality/whs.replenishment/quality.whs.replenishment.component';
import { DashboardCAOComponent } from './pages/reporting/dashboard/cao/dashboard.cao.component';
import { DashboardCycleComponent } from './pages/reporting/dashboard/cycle/dashboard.cycle.component';
import { DashboardSupplierComponent } from './pages/reporting/dashboard/supplier/dashboard.supplier.component';
import { SupplierScheduleComponent } from './pages/schedule/supplier.schedule/supplier.schedule.component';
import { SupplierScheduleServiceContractComponent } from './pages/schedule/service.contract/service.contract.component';
import { SearchComponent } from './pages/search/search.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { WarehouseComponent } from './pages/warehouse/warehouse.component';
import { FixPickingUnitComponent } from './pages/warehouse/toolkit/fix.picking.unit/fix.picking.unit.component';
import { MissingCAOComponent } from './pages/cao/missing/missingcao.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  /* Cycle count / Inventory */
  { path: 'counting', component: CountingComponent},
  { path: 'inventory', component: StockComponent},
  /* MDM */
  { path: 'search', component: SearchComponent},
  { path: 'inquiry', component: InquiryComponent},
  { path: 'mdmattribute', component: MdmAttributeComponent},
  { path: 'mdmbrand', component: MdmAttributeBrandComponent},
  { path: 'category', component: CategoryComponent},
  /* CAO */
  { path: 'caoconfig', component: CaoConfigComponent},
  { path: 'caomissing', component: MissingCAOComponent},
  /* FINANCE */
  { path: 'ediinvoice', component: EDIInvoiceComponent},
  /* VENDOR SCHEDULE */
  { path: 'schedule', component: SupplierScheduleComponent},
  { path: 'service', component: SupplierScheduleServiceContractComponent},
  /* WAREHOUSE */
  { path: 'warehouse', component: WarehouseComponent},
  { path: 'fixpickingunit', component: FixPickingUnitComponent},
  /* IT */
  { path: 'batchschedule', component: BatchScheduleComponent},
  { path: 'batchlist', component: MyBatchListComponent},
  /* MASS_CHANGE */
  { path: 'massjournal', component: MassJournalComponent},
  { path: 'svattribute', component: SVAttributeComponent},
  { path: 'itemhierarchy', component: ItemHierarchyComponent},
  /* Reporting */
  { path: 'scorecardcao', component: ScorecardCAOComponent},
  { path: 'dashboardcao', component: DashboardCAOComponent},
  { path: 'dashboardcycle', component: DashboardCycleComponent},
  { path: 'dashboardsupplier', component: DashboardSupplierComponent},
  { path: 'qualitywhsreplenishment', component: QualityWhsReplenishmentComponent},
  { path: 'reporting', component: ReportingComponent},

  /** ERROR */
  { path: 'server-error', component: ServerErrorComponent},
  { path: 'not-accessible', component: NotAccessibleComponent},
  { path: 'not-found', component: NotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
