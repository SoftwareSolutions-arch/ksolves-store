import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginRoutes } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailResetPasswordComponent } from './email-reset-password/email-reset-password.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ErrorHandler, Injectable} from '@angular/core';
import { LoaderComponent } from '../common-components/loader/loader.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        LoginRoutes,
        FormsModule,
        ReactiveFormsModule,
        
    ],
    declarations: [LoginComponent,LoaderComponent, SignupComponent,ResetPasswordComponent,EmailResetPasswordComponent],
    providers: [
        { provide: ErrorHandler },

    ]
})
export class LoginModule {

}