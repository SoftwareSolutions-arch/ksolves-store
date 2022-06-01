import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailResetPasswordComponent } from './email-reset-password/email-reset-password.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'reset-password', component: ResetPasswordComponent
  },
  {
    path: 'email-reset-password', component: EmailResetPasswordComponent
  }
];

export const LoginRoutes = RouterModule.forChild(routes);
