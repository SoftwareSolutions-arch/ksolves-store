import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-page-routing.module';
import { InvoicesFormViewComponent } from './invoices-form-view/invoices-form-view.component';
import { InvoicesListViewComponent } from './invoices-list-view/invoices-list-view.component';
import { QuotationsListViewComponent } from './quotations-list-view/quotations-list-view.component';
import { SaleOrderListComponent } from './sale-order-list/sale-order-list.component';
import { SaleOrderFormComponent } from './sale-order-form/sale-order-form.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { QuotationsFormViewComponent } from './quotations-form-view/quotations-form-view.component';

@NgModule({
  imports: [
    CommonModule,
    PortalRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    InvoicesFormViewComponent,
    InvoicesListViewComponent,
    QuotationsListViewComponent,
    SaleOrderListComponent,
    SaleOrderFormComponent,
    MyAccountComponent,
    EditAddressComponent,
    QuotationsFormViewComponent,
  ],
})
export class PortalModule { }
