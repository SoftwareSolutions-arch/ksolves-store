import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/services.service';
import { privateKey, publicKey } from '../../config';
const sign = require('jwt-encode');
import jwt_decode from "jwt-decode";
import { PaymentServicesService } from 'src/app/payment-checkout/payment-services.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-email-reset-password',
  templateUrl: './email-reset-password.component.html',
  styleUrls: ['./email-reset-password.component.scss']
})
export class EmailResetPasswordComponent implements OnInit {
  resetForm: any = FormGroup;
  error_messages: any = '';
  passwordNotMatch: any = '';
  db: any = '';
  token: any = '';
  resetData: any = '';
  csrf_token: any = '';

  constructor(public formBuilder: FormBuilder,public title: Title, private route: ActivatedRoute, private paymentService: PaymentServicesService, public service: ServicesService, public toastr: ToastrService, public router: Router) {
    this.setupFormData();
    this.route.queryParamMap.subscribe(queryParams => {
      this.db = queryParams.get("db");
      this.token = queryParams.get("token");
      this.service.get4('web/reset-password?db=' + this.db + '&token=' + this.token, 'response').subscribe(result => {
        this.resetData = result.body;
        localStorage.setItem('csrf_token', this.resetData.csrf);
        var decoding_data: any = this.decodingData(result.headers.get('authorization').replace('Bearer ', '')); // decoding data
        var encoding_data: any = this.encodingData({ "session_id": decoding_data.session_id });                 // encoding data
        localStorage.setItem('sessionId', encoding_data);
      })
    })
  }

  ngOnInit(): void {
    this.title.setTitle('Email-reset-password | Ksolves-store');
  }

  setupFormData() {
    this.error_messages = {
      password: [
        { type: "required", message: '*Required' },
      ],
      confirm_password: [
        { type: "required", message: '*Required' }]
    };
    this.resetForm = this.formBuilder.group(
      {
        password: new FormControl("", Validators.compose([
          Validators.required,
          this.equalto('confirm_password')
        ])),
        confirm_password: new FormControl("", Validators.compose([
          Validators.required,
          this.equalto('password')
        ]))
      }
    );
  }

  // method for comparsion password and confirm password
  equalto(field_name: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let input = control.value;
      let isValid = control.root.value[field_name] == input
      if (!isValid)
        return { 'equalTo': { isValid } }
      else
        return null as any;
    };
  }


  // encoding data
  encodingData(token: any) {
    return sign(token, privateKey, { alg: "HS256" });
  }

  // decoding data
  decodingData(token: any) {
    return jwt_decode(token);
  }

  onSubmit() {
    var formData = new FormData();
    formData.append("login", this.resetData.login);
    formData.append("password", this.resetForm.value.password);
    formData.append("confirm_password", this.resetForm.value.confirm_password);
    formData.append("csrf_token", this.resetData.csrf);
    formData.append("password", this.resetForm.value.confirm_password);
    formData.append("redirect", '');
    formData.append("token", this.resetData.token);
    this.service.post('web/reset-password?db=' + this.db + '&token=' + this.token, formData).subscribe(result => {

      if (result.error == "Invalid signup token") {
        this.toastr.error(result.error);
      }
      else {
        var decoding_data: any = this.decodingData(result.headers.get('authorization').replace('Bearer ', '')); // decoding data
        var encoding_data: any = this.encodingData({ "session_id": decoding_data.session_id });
        localStorage.setItem('sessionId', encoding_data);
        localStorage.setItem('isLogin', 'true');
        this.callMethod();
        this.toastr.success("Reset successfully");
        this.router.navigate(['']);
      }
    })
  }

  // update header data
  callMethod() {
    this.paymentService.callComponentMethodLogin();
  };
}
