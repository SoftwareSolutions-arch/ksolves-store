import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-invoices-form-view',
  templateUrl: './invoices-form-view.component.html',
  styleUrls: ['./invoices-form-view.component.scss']
})
export class InvoicesFormViewComponent implements OnInit {
  isLoadingBool: boolean = true;
  str: any = '';
  iframeSrc: any = '';
  baseUrl: any = '';
  invoiceFormDeatails: any = '';
  url: any = '';
  print_url: any = '';
  invoice_number: any = '';
  payment_modal: any = '';
  messageData: any = '';
  payment_acquirers: any = '';
  payment_acquirers_second: any = '';
  show: any = 3;
  myId: any = Number;

  constructor(public service: ServicesService,public title: Title, public activatedRoute: ActivatedRoute, public router: Router, public sanitizer: DomSanitizer) {
    this.baseUrl = this.service.baseurl;
    this.str=this.router.url.substring(1);
    this.invoiceForm();
  }

  ngOnInit(): void {
    this.title.setTitle('Invoice-form | Ksolves-store');
  }

  andMore() {
    this.show = this.show + 3;
  }

  // invoice form details
  invoiceForm() {
    this.service.get5(this.str).subscribe(res => {
      this.invoiceFormDeatails = res;
      if (this.invoiceFormDeatails.breadcrumb.invoice_no == false) {
        this.invoiceFormDeatails.breadcrumb.invoice_no = "Draft"
      }
      this.payment_acquirers = res.payment_acquirers;
      this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + res.main_content.iframe_src.substring(1));
      this.payment_modal = this.sanitizer.bypassSecurityTrustHtml(res.left_side_bar.payment_modal);
      this.messageData = this.sanitizer.bypassSecurityTrustHtml(res.main_content.payment_status);
      this.url = this.baseUrl + this.invoiceFormDeatails.left_side_bar.download.substring(1);
      this.print_url = this.baseUrl + this.invoiceFormDeatails.left_side_bar.print.substring(1);
      this.isLoadingBool = false;
    })
  }

  userInputData(item: any) {
    this.myId = item.id;
    localStorage.setItem('methodName', item.name)
  }

  onSubmit() {
    // paypal
    if (localStorage.getItem('methodName') == 'Paypal') {
      var csrf_token: any = localStorage.getItem('csrf_token')
      var formData = new FormData();
      formData.append("csrf_token", csrf_token);
      formData.append("acquirer_id", this.myId);
      formData.append("acquirer_id", this.myId);
      this.service.post('shop/payment/transaction/', formData).subscribe(result => {
        localStorage.setItem('paymentPage', result.body);
        this.router.navigate(['/payment-confirmation/payment-processing']);
      })
    }

    if (localStorage.getItem('methodName') == "Stripe") {
      let formData = new FormData();
      formData.append('acquirer_id', this.myId);
      formData.append('access_token', this.invoiceFormDeatails.access_token);
      formData.append('success_url', this.invoiceFormDeatails.success_url);
      formData.append('error_url', this.invoiceFormDeatails.error_url);
      formData.append('save_token', '');
      formData.append('callback_method', '');
      formData.append('order_id', '');
      var key = this.invoiceFormDeatails.prepare_tx_url.substring(1);
      this.service.post(key, formData).subscribe(res => {

        var data = "<div>" + res.body + "</div>";
        let session_id: any = $(data).find('input[name="session_id"]').val();
        let stripe_key: any = $(data).find('input[name="stripe_key"]').val();
        localStorage.setItem('payment_session_id', session_id);
        localStorage.setItem('stripe_session_id', stripe_key);
        this.paymentFunction();
      })
    }
  }

  paymentFunction() {
    const dynamicScripts = [
      'assets/payment.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
}
