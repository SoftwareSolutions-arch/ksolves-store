import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common-components/header/header.component';
import { FooterComponent } from './common-components/footer/footer.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { NgxPaginationModule } from 'ngx-pagination';
import { ErrorPageComponent } from './error-page/error-page.component';
// import { ThanksSignupPageComponent } from './login-and-signup/thanks-signup-page/thanks-signup-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
    // ThanksSignupPageComponent
  ],
  imports: [
    NgxStarRatingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CarouselModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    PopoverModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
      closeButton: false,
      tapToDismiss: true,
      enableHtml: true,
      timeOut: 1500,
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports:[]
})

export class AppModule { }
