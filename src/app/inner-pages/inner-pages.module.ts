import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { innerRoutes } from './inner-pages-routing.module';
import { AboutComponent } from './about/about.component';
import { CookiesPolicyComponent } from './cookies-policy/cookies-policy.component';
import { CustomizationPolicyComponent } from './customization-policy/customization-policy.component';
import { LicenceAgreementComponent } from './licence-agreement/licence-agreement.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import { SupportAndMaintenanceComponent } from './support-and-maintenance/support-and-maintenance.component';
import { TermsAndPoliciesComponent } from './terms-and-policies/terms-and-policies.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { PressComponent } from './press/press.component';
import { OurCultureComponent } from './our-culture/our-culture.component';
import { BlogComponent } from './blog/blog.component';
import { SubmitIdeaComponent } from './submit-idea/submit-idea.component';
import { RequestAQuoteComponent } from './request-a-quote/request-a-quote.component';
import { TicketRequestComponent } from './ticket-request/ticket-request.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SuccessStoriesComponent } from './success-stories/success-stories.component';
import { HomeModule } from '../home-modules/home-module';
import { SupportComponent } from 'src/app/home-modules/support/support.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { BulkOfferComponent } from './bulk-offer/bulk-offer.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        innerRoutes,
        FormsModule,
        ReactiveFormsModule,
        HomeModule
    ],
    declarations: [
        AboutComponent, CookiesPolicyComponent, CustomizationPolicyComponent,
        LicenceAgreementComponent, RefundPolicyComponent, SupportAndMaintenanceComponent,
        TermsAndPoliciesComponent, TestimonialsComponent, PressComponent, OurCultureComponent,
        BlogComponent, SubmitIdeaComponent, RequestAQuoteComponent, TicketRequestComponent,
        SitemapComponent, ContactUsComponent, SuccessStoriesComponent, ThankYouComponent, BulkOfferComponent
    ],
    providers: [SupportComponent]
})
export class innerModule {

}