import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Title } from '@angular/platform-browser';
import { ServicesService } from "src/app/services.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "app-request-a-quote",
  templateUrl: "./request-a-quote.component.html",
  styleUrls: ["./request-a-quote.component.scss"],
})
export class RequestAQuoteComponent implements OnInit {
  reqquoteform: any = FormGroup;
  error_messages: any = "";
  csrf_token: any = "";
  allCountryList: any = '';
  response_id: any = "";
  isLoadingBool: boolean = false;
  formSubmitted = false;

  constructor(public title: Title,
    public formBuilder: FormBuilder,
    public service: ServicesService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.reqquoteformData();
  }

  ngOnInit(): void {
    this.title.setTitle('Request-a-quote | Ksolves-store');
    this.getCountries();
  }

  getCountries() {
    var csrf: any = localStorage.getItem('csrf_token')
    var formData = new FormData();
    formData.append("csrf_token", csrf);
    // formData.append("partner_id", '517');

    this.service.get5('request-a-quote').subscribe(result => {
      this.allCountryList = result;
    })
  }

  reqquoteformData() {
    this.reqquoteform = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
          ),
        ])
      ),
      country: new FormControl(
        "",
        Validators.compose([
          Validators.required,
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
      organization: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      requirements: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.reqquoteform.valid) {
      let formData = new FormData();
      formData.append("email", this.reqquoteform.value.email);
      formData.append("name", this.reqquoteform.value.name);
      formData.append("phone", this.reqquoteform.value.phone);
      formData.append("organization:", this.reqquoteform.value.organization);
      formData.append("country", this.reqquoteform.value.country);
      formData.append("requirements", this.reqquoteform.value.requirements);
      this.isLoadingBool = true;
      this.service.post("custom/website_form/ks_customer.request/", formData).subscribe((result) => {
        this.isLoadingBool = false;
        this.response_id = result.body.id;
        if (this.response_id != 0) {
          this.router.navigate(['/thank-you']);
        }
      });
    }
   
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.reqquoteform.controls[controlName].hasError(errorName);
  }

  validationErrorExists() {
    return ((this.formSubmitted) && !this.reqquoteform.valid);
  }
}
