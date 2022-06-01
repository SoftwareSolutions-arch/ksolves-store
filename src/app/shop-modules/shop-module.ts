import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShopRoutes } from './shop-routing.module';
import { OdooAppsComponent } from './odoo-apps/odoo-apps.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WishlistComponent } from './wishlist/wishlist.component';
import { EmptyWishlistComponent } from './empty-wishlist/empty-wishlist.component';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import { OdooAppDetailsComponent } from './odoo-app-details/odoo-app-details.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { SuggestedAppComponent} from './suggested-app/suggested-app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ShopRoutes,
        CarouselModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        NgxStarRatingModule,
        NgbModule
    ],
    declarations: [
        OdooAppsComponent,
        WishlistComponent,
        EmptyWishlistComponent,
        OdooAppDetailsComponent,
        EmptyCartComponent,
        SuggestedAppComponent
    ],
    providers: [
    ]
})
export class ShopModule {

}