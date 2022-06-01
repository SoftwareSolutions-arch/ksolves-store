import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentServicesService } from 'src/app/payment-checkout/payment-services.service';
import { ServicesService } from 'src/app/services.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sale-order-form',
  templateUrl: './sale-order-form.component.html',
  styleUrls: ['./sale-order-form.component.scss']
})
export class SaleOrderFormComponent implements OnInit {
  isLoadingBool: boolean = true;
  str: any = '';
  iframeSrc: any = '';
  baseUrl: any = '';
  salesFormDeatails: any = '';
  url: any = '';
  print_url: any = '';
  sales_number: any = '';
  main_content: any = '';
  dataMsg: any = '';
  payment_acquirers: any = ''
  acquire_name: any = '';
  acquire_id: any = '';

  constructor(public service: ServicesService,public title: Title, private paymentService: PaymentServicesService, public activatedRoute: ActivatedRoute, public router: Router, public sanitizer: DomSanitizer) {
    this.baseUrl = this.service.baseurl;
    this.str = this.router.url.substring(1);
    this.salesForm();
  }

  // sales form details
  salesForm() {
    this.service.get5(this.str).subscribe(res => {
      this.callMethod('')
      this.salesFormDeatails = res;
      this.payment_acquirers = res.left_side_bar.payment_acquirers;
      this.sales_number = this.salesFormDeatails.breadcrumb.breadcrumb_url.substring(1);
      this.url = this.baseUrl + this.salesFormDeatails.left_side_bar.download.substring(1);
      this.main_content = this.sanitizer.bypassSecurityTrustHtml(this.salesFormDeatails.main_content);
      this.dataMsg = this.sanitizer.bypassSecurityTrustHtml(this.salesFormDeatails.message);
      this.print_url = this.baseUrl + this.salesFormDeatails.left_side_bar.print.substring(1);
      this.isLoadingBool = false;
    })
  }

  go() {
    if (this.salesFormDeatails.breadcrumb.breadcrumb_url == "/ Quotations/ Quotation SO919") {
      this.router.navigate(['/my/quotations-list'])
    }

    else {
      this.router.navigate(['/my/sale-order-list'])
    }
  }
  ngOnInit(): void {
    this.title.setTitle('Sale-order-form | Ksolves-store');
  }

  // update header data
  callMethod(count: any) {
    this.paymentService.callComponentMethod(count);
  };


  userInputData(item: any) {
    this.acquire_id = item.id;
    this.acquire_name = item.name;
  }

  onSubmit() {
    // paypal
    if (this.acquire_name == 'Paypal') {
      var csrf_token: any = localStorage.getItem('csrf_token')
      var formData = new FormData();
      formData.append("csrf_token", csrf_token);
      formData.append("acquirer_id", this.acquire_id);
      this.service.post('shop/payment/transaction/', formData).subscribe(result => {
        localStorage.setItem('paymentPage', result.body);
        this.router.navigate(['/payment-confirmation/payment-processing']);
      })
    }
    // stripe
    if (this.acquire_name == "Stripe") {
      let formData = new FormData();
      formData.append('acquirer_id', this.acquire_id);
      formData.append('access_token', this.salesFormDeatails.left_side_bar.access_token);
      formData.append('save_token', '');
      formData.append('callback_method', '');
      formData.append('order_id', '');
      var key = this.salesFormDeatails.left_side_bar.prepare_tx_url.substring(1);
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
