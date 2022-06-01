import { Routes, RouterModule } from '@angular/router';
import { EmptyWishlistComponent } from './empty-wishlist/empty-wishlist.component';
import { OdooAppsComponent } from './odoo-apps/odoo-apps.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OdooAppDetailsComponent } from './odoo-app-details/odoo-app-details.component';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';

const routes: Routes = [
  {
    path: 'odoo-apps', component: OdooAppsComponent
  },
  {
    path: 'wishlist', component: WishlistComponent
  },
  {
    path: 'empty-wishlist', component: EmptyWishlistComponent
  },
  {
    path: 'odoo-apps/:id', component: OdooAppDetailsComponent
  },
  {
    path: 'magento-apps/:id', component: OdooAppDetailsComponent
  },
  {
    path: 'odoo-themes/:id', component: OdooAppDetailsComponent
  },
  {
    path: 'cart', component: EmptyCartComponent
  },
  {
    path: '**', component: OdooAppsComponent
  }
];

export const ShopRoutes = RouterModule.forChild(routes);
