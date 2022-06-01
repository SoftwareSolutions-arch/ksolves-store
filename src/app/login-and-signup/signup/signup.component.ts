import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ServicesService } from 'src/app/services.service';
import { privateKey } from '../../config';
const sign = require('jwt-encode');
import jwt_decode from "jwt-decode";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PaymentServicesService } from 'src/app/payment-checkout/payment-services.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: any = FormGroup;
  error_messages: any = '';
  webResponse: any = '';
  csrf_token: any = '';
  redirect: any = '';
  signUpError: boolean = false;
  isLoadingBool: boolean = true;
  errorMessage: any = '';
  isAccountCreated: boolean = false;
  isCloseError: boolean = false;
  constructor(public formBuilder: FormBuilder, public title: Title, private paymentService: PaymentServicesService, public router: Router,
    public toast: ToastrService, public service: ServicesService) {
    this.setupsignupData();
    this.generateToken();
  }

  ngOnInit(): void {
    this.title.setTitle('Signup | Ksolves-store');
  }

  setupsignupData() {
    this.error_messages = {
      email: [
        { type: "required", message: '*Required' },
        { type: "pattern", message: '*Please enter valid email' }
      ]
    };
    this.signupForm = this.formBuilder.group(
      {
        email: new FormControl("", Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),]))
      }
    );
  }

  generateToken() {
    this.isLoadingBool = true;
    this.service.get4('web/signup', 'response').subscribe(result => {
      this.isLoadingBool = false;
      this.csrf_token = result.body;
      localStorage.setItem('csrf_token', this.csrf_token);
      var decoding_data: any = this.decodingData(result.headers.get('authorization').replace('Bearer ', '')); // decoding data
      var encoding_data: any = this.encodingData({ "session_id": decoding_data.session_id });                 // encoding data
      localStorage.setItem('sessionId', encoding_data);
    })
  }

  // encoding data
  encodingData(token: any) {
    return sign(token, privateKey, { alg: "HS256" });
  }

  // decoding data
  decodingData(token: any) {
    return jwt_decode(token);
  }

  onclick() {
    this.signUpError = false
  }

  onSubmit() {
    this.isLoadingBool = true;
    var formData = new FormData();
    formData.append("login", this.signupForm.value.email);
    formData.append('csrf_token', this.csrf_token.csrf);
    formData.append('token', (this.csrf_token.token != '' || undefined ? '' : ''));
    formData.append('redirect', (this.csrf_token.redirect != '' || undefined ? '' : ''));
    this.service.post('web/signup', formData).subscribe(result => {
      this.isLoadingBool = false;
      this.signUpError = result.body.error;
      this.errorMessage = result.body.error
      if (result.body.error) {
        this.signUpError = true;
      }
      else {
        this.isAccountCreated = true;
        var decoding_data: any = this.decodingData(result.headers.get('authorization').replace('Bearer ', '')); // decoding data
        var encoding_data: any = this.encodingData({ "session_id": decoding_data.session_id });
        localStorage.setItem('sessionId', encoding_data);
        localStorage.setItem('isLogin', 'true');
        this.callMethod();
        // this.toast.success("Sign up successfullly");
        // this.router.navigate(['']);
      }
    })
  }

  // update header data
  callMethod() {
    this.paymentService.callComponentMethodLogin();
  };

  closeButton() {
    this.signUpError = false;
  }
}