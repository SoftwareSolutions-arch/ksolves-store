import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ServicesService } from "src/app/services.service"; import { ActivatedRoute, Router } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { Meta, MetaDefinition } from '@angular/platform-browser';


@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.scss"],
})
export class ContactUsComponent implements OnInit {
  error_messages: any = "";
  csrf_token: any = "";
  response_id: any = "";
  isLoadingBool: boolean = false;
  mod_name: any = '';
  ver: any = '';

  formSubmitted = false;
  public addShopFormGroup: any = FormGroup;

  constructor(public title: Title, private metaService: Meta,
    public formBuilder: FormBuilder,
    public service: ServicesService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.mod_name = queryParams.get("mod_name");
      this.ver = queryParams.get("ver");
    })

    this.metaService.addTag({ name: 'description', content: 'Article Description' });
    this.metaService.addTag({ name: 'robots', content: 'index,follow' });
    this.metaService.addTag({ property: 'og:title', content: 'Content Title for social media' });
  }
  
  ngOnInit(): void {
    this.title.setTitle('Contact-us | Ksolves-store');
    this.addShopFormGroup = new FormGroup({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
          ),
        ])
      ),
      name: new FormControl("", Validators.compose([])),
      description: new FormControl(
        "",
        Validators.compose([])
      ),
    });
  }

  formSubmit() {
    this.formSubmitted = true;
    if (this.addShopFormGroup.valid) {
      let formData = new FormData();
      formData.append("email_from", this.addShopFormGroup.value.email);
      formData.append("name", this.addShopFormGroup.value.name);
      formData.append("description", this.addShopFormGroup.value.description);
      this.isLoadingBool = true;
      if (this.ver != null && this.mod_name != null) {
        formData.append("ver", this.ver);
        formData.append("mod_name", this.mod_name);
        this.service.post("custom/website_form/ks_custom.contact.us", formData).subscribe((result) => {
          this.isLoadingBool = false;
          this.response_id = result.body.id;
          if (this.response_id != 0) {
            this.router.navigate(["/thank-you"]);
          }
        });
      }

      else {
        this.service.post("custom/website_form/crm.lead", formData).subscribe((result) => {
          this.isLoadingBool = false;
          this.response_id = result.body.id;
          if (this.response_id != 0) {
            this.router.navigate(["/thank-you"]);
          }
        });
      }
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addShopFormGroup.controls[controlName].hasError(errorName);
  }

  validationErrorExists() {
    // return ((this.formSubmitted || this.addShopFormGroup.dirty) && !this.addShopFormGroup.valid);
    return ((this.formSubmitted) && !this.addShopFormGroup.valid); 
  }
}
