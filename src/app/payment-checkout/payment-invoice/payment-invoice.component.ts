import { Component, OnInit } from '@angular/core';
import { PaymentServicesService } from '../payment-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-payment-invoice',
  templateUrl: './payment-invoice.component.html',
  styleUrls: ['./payment-invoice.component.scss']
})
export class PaymentInvoiceComponent implements OnInit {
  invoiceDetail: any = '';
  print_order_url:any=''
  constructor(private paymentService: PaymentServicesService,public service: ServicesService) {
    var data: any = localStorage.getItem('paymentResponse')
    this.invoiceDetail = JSON.parse(data);
    console.log('this.invoiceDetail',this.invoiceDetail)
    this.print_order_url=this.invoiceDetail.print_order_url
  }

  ngOnInit(): void {
    this.callMethod('')
  }

  // update header data
  callMethod(count: any) {
    this.paymentService.callComponentMethod(count);
  };

  printReceipt(){

    this.service.post('custom/shop/print', '').subscribe(res => {
    })
    
  }

}
