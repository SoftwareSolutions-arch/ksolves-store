import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/services.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  editAddress: any = FormGroup;
  error_messages: any = '';
  accountDetails: any = '';
  allStateList: any = '';
  hidestatelist: boolean = false;
  isLoadingBool: boolean = true;

  constructor(public formBuilder: FormBuilder,public title: Title,public toast:ToastrService, public router: Router, public service: ServicesService) {
    this.getAccountDetails();
  }

  ngOnInit(): void {
    this.title.setTitle('Edit-address | Ksolves-store');
    this.setupLoginFormData();
  }

  setupLoginFormData() {
    this.error_messages = {
      email: [
        { type: "required", message: '*Required' },
        { type: "pattern", message: '*Please enter valid email' }
      ],
      name: [
        { type: "required", message: '*Required' }
      ],
      phone: [
        { type: "required", message: '*Required' }
      ],

      country_name: [
        { type: "required", message: '*Required' }
      ],

      city: [
        { type: "required", message: '*Required' }
      ],
      street: [
        { type: "required", message: '*Required' }
      ],
      zip_code: [
        { type: "required", message: '*Required' }
      ]
    };
    this.editAddress = this.formBuilder.group(
      {
        email: new FormControl("", Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),])),
        name: new FormControl("", Validators.compose([Validators.required])),
        phone: new FormControl("", Validators.compose([Validators.required])),
        company_name: new FormControl(""),
        country_name: new FormControl("", Validators.compose([Validators.required])),
        vat_number: new FormControl(""),
        city: new FormControl("", Validators.compose([Validators.required])),
        street: new FormControl("", Validators.compose([Validators.required])),
        zip_code: new FormControl("", Validators.compose([Validators.required])),
        state_id: new FormControl("", Validators.compose([Validators.required]))
      }
    );
  }

  getState() {
    this.allStateList = [];
    var formData = new FormData();
    this.service.post('custom/shop/country_infos/' + this.editAddress.value.country_name, formData).subscribe(result => {
      this.allStateList = result.body.states;
      if (this.allStateList.length == 0) {
        this.hidestatelist = true;
      }
      else {
        this.hidestatelist = false;
      }
    })
  }

  getAccountDetails() {
    this.service.getAllData('my/account').subscribe(res => {
      this.isLoadingBool = false;
      this.accountDetails = res;
      if(this.accountDetails.readonly_company==true){
        this.editAddress.controls.company_name.disable();
      }
      this.allStateList = res.states;
      this.editAddress.controls.name.setValue(this.accountDetails.name);
      this.editAddress.controls.email.setValue(this.accountDetails.email);
      this.editAddress.controls.phone.setValue(this.accountDetails.phone);
      this.editAddress.controls.company_name.setValue(this.accountDetails.company);
      this.editAddress.controls.vat_number.setValue(this.accountDetails.vat);
      this.editAddress.controls.city.setValue(this.accountDetails.city);
      this.editAddress.controls.country_name.setValue(this.accountDetails.country_id);
      this.editAddress.controls.street.setValue(this.accountDetails.street);
      this.editAddress.controls.zip_code.setValue(this.accountDetails.zip);
      this.editAddress.controls.state_id.setValue(this.accountDetails.state_id);
    })
  }

  onSubmit() {
    this.isLoadingBool = true;
    var formData = new FormData();
    if (this.accountDetails.readonly_company != true) {
      formData.append("company_name", this.editAddress.value.company_name);
    }
    if (this.accountDetails.readonly_vat != true) {
      formData.append("vat", this.editAddress.value.vat_number);
    }
    
    formData.append("name", this.editAddress.value.name);
    formData.append("email", this.editAddress.value.email);
    formData.append("phone", this.editAddress.value.phone);
    formData.append("city", this.editAddress.value.city);
    formData.append("country_id", this.editAddress.value.country_name);
    formData.append("street", this.editAddress.value.street);
    formData.append("zipcode", this.editAddress.value.zip_code);
    formData.append("csrf_token", this.accountDetails.csrf_token);
    formData.append("state_id", this.editAddress.value.state_id);
    this.service.post('my/account', formData).subscribe(result => {
      if(result.body.data_updated==true){
        this.isLoadingBool = false;
        this.router.navigate(['/my/my-account']);
      }
      else {
        this.getAccountDetails()
        this.isLoadingBool = false;
        this.toast.error(result.body.error_message[0]);
      }
    })
  }
}
