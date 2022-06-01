import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import jwt_decode from "jwt-decode";
import { ServicesService } from "src/app/services.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from '@angular/platform-browser';
@Component({
  selector: "app-ticket-request",
  templateUrl: "./ticket-request.component.html",
  styleUrls: ["./ticket-request.component.scss"],
})
export class TicketRequestComponent implements OnInit {
  ticketReqForm: any = FormGroup;
  error_messages: any = "";
  allCountryList: any = "";
  fileToUpload: File | null = null;
  myFiles: any[] = [];
  csrf_token: any = "";
  isLoadingBool: boolean = false;
  response_id: any = "";
  formSubmitted = false;

  constructor(public title: Title,
    public formBuilder: FormBuilder,
    public service: ServicesService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.ticketReqFormData();
  }

  ticketReqFormData() {
    this.error_messages = {
      email: [
        { type: "required", message: "*Required" },
        { type: "pattern", message: "*Please enter valid email" },
      ],
      backup_email: [
        { type: "required", message: "*Required" },
        { type: "pattern", message: "*Please enter valid email" },
      ],
      customer_name: [{ type: "required", message: "*Required" }],
      type: [{ type: "required", message: "*Required" }],
      subject: [{ type: "required", message: "*Required" }],
      description: [{ type: "required", message: "*Required" }],
      attachment_ids: [{ type: "required", message: "*Required" }]
    };
    this.ticketReqForm = this.formBuilder.group({
      email: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"),])),
      backup_email: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"),])),
      customer_name: new FormControl("", Validators.compose([Validators.required])),
      type: new FormControl("", Validators.compose([Validators.required])),
      subject: new FormControl("", Validators.compose([Validators.required])),
      description: new FormControl("", Validators.compose([Validators.required])),
      attachment_ids: new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Ticket-request | Ksolves-store');
    var data = localStorage.getItem("sessionId");

    if (data == null) {
      this.generateToken();
    }
  }

  generateToken() {
    this.service.get("/website_form").subscribe((result) => {
      localStorage.setItem("csrf_token", this.csrf_token);
      var decoding_data: any = this.decodingData(
        result.headers.replace("Bearer ", "")
      ); // decoding data
      var encoding_data: any = this.encodingData({
        session_id: decoding_data.session_id,
      }); // encoding data
      localStorage.setItem("sessionId", encoding_data);
    });
  }

  // encoding data
  encodingData(token: any) {
    return;
  }

  // decoding data
  decodingData(token: any) {
    return jwt_decode(token);
  }

  onFileChange(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.ticketReqForm.valid) {
      this.isLoadingBool = true;
      let formData = new FormData();
      formData.append("email", this.ticketReqForm.value.email);
      formData.append("customer_name", this.ticketReqForm.value.customer_name);
      formData.append("type", this.ticketReqForm.value.type);
      formData.append("subject", this.ticketReqForm.value.subject);
      formData.append("backup_email", this.ticketReqForm.value.backup_email);
      formData.append("description", this.ticketReqForm.value.description);
      for (var i = 0; i < this.myFiles.length; i++) {
        formData.append("attachment_ids", this.myFiles[i]);
      }
  
      this.service.post("custom/website_form/ks_customer.support", formData).subscribe((result) => {
        this.isLoadingBool = false;
        this.response_id = result.body.id;
        if (this.response_id != 0) {
          this.router.navigate(["/thank-you"]);
        }
      });
    }
    
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.ticketReqForm.controls[controlName].hasError(errorName);
  }

  validationErrorExists() {
    // return ((this.formSubmitted || this.ticketReqForm.dirty) && !this.ticketReqForm.valid);
    return ((this.formSubmitted) && !this.ticketReqForm.valid);
  }
}
