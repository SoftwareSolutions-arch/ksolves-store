import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeRoutes } from './home-routing.module';
import { AwardsComponent } from './awards/awards.component';
import { HomeComponent } from './home/home.component'
import { HomeCarouselComponent } from './home-carousel/home-carousel.component'
import { LetsTalkComponent } from './lets-talk/lets-talk.component'
import { SuggestedAppComponent } from './suggested-app/suggested-app.component'
import { SupportComponent } from './support/support.component'
import { TestimonialsComponent } from './testimonials/testimonials.component'
import { ThemeAppsComponent } from './theme-apps/theme-apps.component'
import { WhyKsolvesComponent } from './why-ksolves/why-ksolves.component'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FestivalComponent } from './festival/festival.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HomeRoutes, 
        CarouselModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        HomeComponent,
        AwardsComponent,
        HomeCarouselComponent,
        LetsTalkComponent,
        SuggestedAppComponent,
        SupportComponent,
        TestimonialsComponent,
        ThemeAppsComponent,
        WhyKsolvesComponent,
        FestivalComponent
    ],
    providers: [],
    exports:[SupportComponent,SuggestedAppComponent]
})
export class HomeModule {

}