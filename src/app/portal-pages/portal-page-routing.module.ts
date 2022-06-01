import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesFormViewComponent } from './invoices-form-view/invoices-form-view.component';
import { InvoicesListViewComponent } from './invoices-list-view/invoices-list-view.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { QuotationsListViewComponent } from './quotations-list-view/quotations-list-view.component';
import { SaleOrderFormComponent } from './sale-order-form/sale-order-form.component';
import { SaleOrderListComponent } from './sale-order-list/sale-order-list.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AuthGuard } from '../_helpers';

const routes: Routes = [
    {
        path: 'my-account', component: MyAccountComponent,canActivate:[AuthGuard]
    },
    {
        path: 'edit-address', component: EditAddressComponent,canActivate:[AuthGuard]
    },
    {
        path: 'invoice-list', component: InvoicesListViewComponent,canActivate:[AuthGuard]
    },
    {
        path: 'quotations-list', component: QuotationsListViewComponent,canActivate:[AuthGuard]
    },
    {
        path: 'sale-order-list', component: SaleOrderListComponent,canActivate:[AuthGuard]
    },
    {
        path: 'invoices/:id', component: InvoicesFormViewComponent
    },
    {
        path: 'orders/:id', component: SaleOrderFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortalRoutingModule { }
