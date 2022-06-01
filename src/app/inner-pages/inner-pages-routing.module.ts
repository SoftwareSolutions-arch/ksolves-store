import { Routes, RouterModule } from '@angular/router';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AboutComponent } from './about/about.component';
import { CookiesPolicyComponent } from './cookies-policy/cookies-policy.component';
import { CustomizationPolicyComponent } from './customization-policy/customization-policy.component';
import { LicenceAgreementComponent } from './licence-agreement/licence-agreement.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import { SupportAndMaintenanceComponent } from './support-and-maintenance/support-and-maintenance.component';
import { TermsAndPoliciesComponent } from './terms-and-policies/terms-and-policies.component';
import { TicketRequestComponent } from './ticket-request/ticket-request.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RequestAQuoteComponent } from './request-a-quote/request-a-quote.component';
import { SubmitIdeaComponent } from './submit-idea/submit-idea.component';
import { BlogComponent } from './blog/blog.component';
import { OurCultureComponent } from './our-culture/our-culture.component';
import { PressComponent } from './press/press.component';
import { SuccessStoriesComponent } from './success-stories/success-stories.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { BulkOfferComponent } from './bulk-offer/bulk-offer.component';

const routes: Routes = [
    {
        path: 'about-us', component: AboutComponent
    },
    {
        path: 'cookies-policy', component: CookiesPolicyComponent
    },
    {
        path: 'success-stories', component: SuccessStoriesComponent
    },
    {
        path: 'press', component: PressComponent
    },
    {
        path: 'sitemap', component: SitemapComponent
    },
    {
        path: 'refund-policy', component: RefundPolicyComponent
    },
    {
        path: 'our-culture', component: OurCultureComponent
    },
    {
        path: 'customization-policy', component: CustomizationPolicyComponent
    },
    {
        path: 'support-and-maintenance', component: SupportAndMaintenanceComponent
    },
    {
        path: 'terms-and-policies', component: TermsAndPoliciesComponent
    },
    {
        path: 'licence-agreement', component: LicenceAgreementComponent
    },
    {
        path: 'magento-license', component: LicenceAgreementComponent
    },
    {
        path: 'testimonials', component: TestimonialsComponent
    },
    {
        path: 'submit-idea', component: SubmitIdeaComponent
    },
    {
        path: 'request-a-quote', component: RequestAQuoteComponent
    },
    {
        path: 'ticket-request', component: TicketRequestComponent
    },
    {
        path: 'contact-us', component: ContactUsComponent
    },
    {
        path: 'thank-you', component: ThankYouComponent
    },
    {
        path: 'bulk-offer', component: BulkOfferComponent
    }
];

export const innerRoutes = RouterModule.forChild(routes);
