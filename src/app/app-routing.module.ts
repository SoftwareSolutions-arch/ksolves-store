import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home-modules/home-module').then(m => m.HomeModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop-modules/shop-module').then(m => m.ShopModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./login-and-signup/login-module').then(m => m.LoginModule)
  },
  {
    path: 'payment-confirmation',
    loadChildren: () => import('./payment-checkout/payment.module').then(m => m.PaymentModule)
  },
  {
    path: '',
    loadChildren: () => import('./inner-pages/inner-pages.module').then(m => m.innerModule)
  },
  {
    path: 'my',
    loadChildren: () => import('./portal-pages/portal-page.module').then(m => m.PortalModule)
  },
  {
    path: '**',
    component: ErrorPageComponent
  },
  {
    path: 'error',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
