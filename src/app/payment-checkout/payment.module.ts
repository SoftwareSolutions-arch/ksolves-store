import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaymentRoutes } from './payment-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaymentCheckoutComponent } from './payment-checkout/payment-checkout.component';
import { PaymentProcessingComponent } from './payment-processing/payment-processing.component';
import { ShopConfirmationComponent } from './shop-confirmation/shop-confirmation.component';
import { PaymentInvoiceComponent } from './payment-invoice/payment-invoice.component';
import { PaymentCancelComponent } from './payment-cancel/payment-cancel.component';
import { PaymentAuthComponent } from './payment-auth/payment-auth.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        PaymentRoutes
    ],
    declarations: [
        PaymentCheckoutComponent,
        PaymentProcessingComponent,
        PaymentInvoiceComponent,
        ShopConfirmationComponent,
        PaymentCancelComponent,
        PaymentAuthComponent
    ],
    providers: [
    ]
})
export class PaymentModule {

}