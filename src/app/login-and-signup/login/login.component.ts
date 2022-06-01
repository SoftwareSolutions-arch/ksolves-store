import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ServicesService } from 'src/app/services.service';
import jwt_decode from "jwt-decode";
import { privateKey } from '../../config';
import { ActivatedRoute, Router } from '@angular/router';
const sign = require('jwt-encode');
import Swal from 'sweetalert2';
import { PaymentServicesService } from 'src/app/payment-checkout/payment-services.service';
import { AuthenticationService } from '../../_services';
import { Title } from '@angular/platform-browser';
import { NavigationService } from 'src/app/_services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  error_messages: any = '';
  loader: boolean = false;
  csrf_token: any = '';
  isLoadingBool: boolean = false;
  product_id: any = '';

  constructor(public formBuilder: FormBuilder
    , public title: Title
    , public authenticationService: AuthenticationService
    , public route: ActivatedRoute
    , private paymentService: PaymentServicesService
    , public router: Router
    , public service: ServicesService
    , private navigation: NavigationService) {
    this.setupLoginFormData();
    this.product_id = this.route.snapshot.paramMap.get('product_id');
    if (localStorage.getItem('sessionId') == null) {
      this.generateToken();
    }
  }

  ngOnInit(): void {
    this.title.setTitle('Login | Ksolves-store');
  }

  setupLoginFormData() {
    this.error_messages = {
      email: [
        { type: "required", message: '*Required' },
        { type: "pattern", message: '*Please enter valid mail' }
      ],
      password: [
        { type: "required", message: '*Required' }
      ],
    };
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl("", Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),])),
        password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
          ])
        ),
      }
    );
  }

  generateToken() {
    this.isLoadingBool = true;
    this.service.get4('custom/web/login', "response").subscribe(result => {
      this.isLoadingBool = false;
      this.csrf_token = result.body.csrf;
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

  buy_now() {
    var formData = new FormData();
    formData.append("product_id", this.product_id);
    this.service.post('shop/product/cart/update', formData).subscribe(result => {
      this.loader = false;
      this.callMethod();
      this.router.navigate(['/payment-confirmation/payment']);
    })
  }

  // update header data
  callMethod() {
    this.paymentService.callComponentMethodLogin();
  };

  // On submit
  onSubmit() {
    var csrf_token: any = localStorage.getItem('csrf_token')
    this.loader = true;
    var formData = new FormData();
    formData.append("login", this.loginForm.value.email);
    formData.append("password", this.loginForm.value.password);
    formData.append('csrf_token', csrf_token);

    this.service.post('custom/web/login', formData).subscribe(result => {
      // get return url from route parameters or default to '/'

      if (result.body.error != undefined) {
        this.loader = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.body.error,
        })
      }
      else {
        var decoding_data: any = this.decodingData(result.headers.get('authorization').replace('Bearer ', '')); // decoding data
        var encoding_data: any = this.encodingData({ "session_id": decoding_data.session_id });
        localStorage.setItem('sessionId', encoding_data);
        localStorage.setItem('isLogin', 'true');
        this.callMethod();
        if (this.product_id == null) {
          this.loader = false;
          this.navigation.back();
        }
        else {
          this.buy_now();
        }
      }
    })
  }
}
