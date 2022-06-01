import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ServicesService } from 'src/app/services.service';
import { privateKey } from '../../config';
const sign = require('jwt-encode');
import jwt_decode from "jwt-decode";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: any = FormGroup;
  error_messages: any = '';
  loader: boolean = false;
  webResponse: any = '';
  isLoadingBool: boolean = true;
  csrf_token: any = ''
  constructor(public formBuilder: FormBuilder,public title: Title,public router: Router, public toast: ToastrService, 
    public service: ServicesService) {
    this.setupresetPasswordData();
    this.generateToken();
  }

  ngOnInit(): void {
    this.title.setTitle('Reset-password | Ksolves-store');
  }

  setupresetPasswordData() {
    this.error_messages = {
      email: [
        { type: "required", message: '*Required' },
        { type: "pattern", message: '*Please enter valid email' }
      ]
    };
    this.resetPasswordForm = this.formBuilder.group(
      {
        email: new FormControl("", Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),])),
      }
    );
  }

  generateToken() {
    this.isLoadingBool = true;
    this.service.get4('web/reset-password','response').subscribe(result => {
      this.isLoadingBool = false;
      this.csrf_token = result.body;

      localStorage.setItem('csrf_token', this.csrf_token.csrf);
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

  // on submit
  onSubmit() {
    this.isLoadingBool = true;
    var formData = new FormData();
    formData.append("login", this.resetPasswordForm.value.email);
    formData.append('csrf_token', this.csrf_token.csrf);
    formData.append('token', (this.csrf_token.token != '' || undefined ? '' : ''));
    formData.append('redirect', (this.csrf_token.redirect != '' || undefined ? '' : ''));

    this.service.post('web/reset-password', formData).subscribe(result => {
      this.isLoadingBool = false;
      if(result.body.error){
        this.toast.error('Email not exist');
        return
      }

      else{
        this.toast.success('Reset link sent to your mail');
        this.router.navigate(['/registration/login']);
      }
    })
  }
}
