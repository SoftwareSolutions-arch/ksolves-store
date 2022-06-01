import { Routes, RouterModule } from '@angular/router';
import { PaymentCheckoutComponent } from './payment-checkout/payment-checkout.component';
import { ShopConfirmationComponent } from '../payment-checkout/shop-confirmation/shop-confirmation.component';
import { PaymentProcessingComponent } from './payment-processing/payment-processing.component';
import { PaymentInvoiceComponent } from './payment-invoice/payment-invoice.component';
import { PaymentCancelComponent } from './payment-cancel/payment-cancel.component';
import { PaymentAuthComponent } from './payment-auth/payment-auth.component';

const routes: Routes = [
    {
        path: 'payment', component: PaymentCheckoutComponent
    },
    {
        path: 'confirm', component: ShopConfirmationComponent
    },
    {
        path: 'payment-processing', component: PaymentProcessingComponent
    },
    {
        path: 'thanks-order', component: PaymentInvoiceComponent
    },
    {
        path: 'cancel', component: PaymentCancelComponent
    },
    {
        path: 'processing', component: PaymentAuthComponent
    },
];

export const PaymentRoutes = RouterModule.forChild(routes);