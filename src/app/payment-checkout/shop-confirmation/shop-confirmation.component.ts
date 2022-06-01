import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../services.service'

@Component({
  selector: 'app-shop-confirmation',
  templateUrl: './shop-confirmation.component.html',
  styleUrls: ['./shop-confirmation.component.scss']
})

export class ShopConfirmationComponent implements OnInit {
  isLoadingBool: boolean = true;
  baseUrl: any
  constructor(public service: ServicesService, public router: Router) {
    this.getProductsDetails()
  }

  ngOnInit(): void {
  }

  getProductsDetails() {
    this.service.post('custom/payment/process/poll', '').subscribe(res => {
      if (res.body.success == true) {
        if (res.body.return_url != undefined) {
          if (res.body.return_url == '/shop/payment/validate') {
            this.paymentValidate(res.body.transactions[0])
          }
          else {
            window.location = res.body.return_url;
          }
        }
        else {
          console.info(res);
          if (res.body.message != undefined) {
            localStorage.setItem('message', JSON.stringify(res.body.message))
            this.router.navigate(['/payment-confirmation/processing'])
          }

          else {
            this.router.navigate(['/payment-confirmation/cancel'])
          }
        }
      }
      else {
        this.router.navigate(['/payment-confirmation/cancel'])
      }
    })
  }

  paymentValidate(tx:any) {
    console.info(tx);
    if (tx.state != 'cancel' && tx.state != 'error') {
      this.service.post('custom/payment/validate', '').subscribe(res => {
        this.isLoadingBool = false;
        console.log('paymentResponse',res);
        localStorage.setItem('paymentResponse', JSON.stringify(res.body));
        this.router.navigate(['/payment-confirmation/thanks-order'])
      })
    }
    else {
      this.router.navigate(['/payment-confirmation/cancel'])
    }
  }
}