import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { ServicesService } from "src/app/services.service";
import jwt_decode from "jwt-decode";
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-submit-idea',
  templateUrl: './submit-idea.component.html',
  styleUrls: ['./submit-idea.component.scss']
})
export class SubmitIdeaComponent implements OnInit {

  submitidea: any = FormGroup;
  error_messages: any = "";
  csrf_token: any = "";
  response_id: any = "";
  isLoadingBool: boolean = false;
  formSubmitted = false;

  constructor(
    public formBuilder: FormBuilder,
    public service: ServicesService,
    public route: ActivatedRoute,
    public router: Router,
    public title: Title
  ) {
    this.submitideaData();
  }

  generateToken() {
    this.service.get("/website_form").subscribe((result) => {
      localStorage.setItem("csrf_token", this.csrf_token);
      var decoding_data: any = this.decodingData(result.headers.replace('Bearer ', '')); // decoding data
      var encoding_data: any = this.encodingData({ "session_id": decoding_data.session_id });                 // encoding data
      localStorage.setItem('sessionId', encoding_data);
    })
  }
  // encoding data
  encodingData(token: any) {
    return
  }

  // decoding data
  decodingData(token: any) {
    return jwt_decode(token);
  }

  ngOnInit(): void {
    this.title.setTitle('Submit-idea | Ksolves-store');
    var data = localStorage.getItem("sessionId");

    if (data == null) {
      this.generateToken();
    }
  }

  submitideaData() {
    // this.error_messages = {
    //   email: [
    //     { type: "required", message: "*Required" },
    //     { type: "pattern", message: "*Please enter valid email" },
    //   ],

    //   name: [{ type: "required", message: "*Required" }],
    //   phone: [
    //     { type: "required", message: "*Required" },
    //     { type: "pattern", message: "*Please enter valid phone number" },
    //   ],
    //   idea: [{ type: "required", message: "*Required" }],
    // };
    this.submitidea = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
          ),
        ])
      ),

      name: new FormControl("", Validators.compose([Validators.required])),
      phone: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
        ])
      ),
      idea: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),

    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.submitidea.valid) {
      let formData = new FormData();
      formData.append("email", this.submitidea.value.email);
      formData.append("name", this.submitidea.value.name);
      formData.append("phone", this.submitidea.value.phone);
      formData.append("idea", this.submitidea.value.idea);
      this.isLoadingBool = true;
      this.service.post("custom/website_form/ks_customer.idea", formData).subscribe((result) => {
        this.isLoadingBool = false;
        this.response_id = result.body.id;
        if (this.response_id != 0) {
          this.router.navigate(['/thank-you']);
        }
      });
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.submitidea.controls[controlName].hasError(errorName);
  }

  validationErrorExists() {
    // return ((this.formSubmitted || this.submitidea.dirty) && !this.submitidea.valid);
    return ((this.formSubmitted) && !this.submitidea.valid);
  }
}
