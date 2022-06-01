import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FestivalComponent } from './festival/festival.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'festive_sale', component: FestivalComponent
  },
  {
    path: 'festive_sale/category/:id', component: FestivalComponent
  },
  // { path: '**', component: FestivalComponent }
];

export const HomeRoutes = RouterModule.forChild(routes);
