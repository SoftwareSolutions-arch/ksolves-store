import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-auth',
  templateUrl: './payment-auth.component.html',
  styleUrls: ['./payment-auth.component.scss']
})
export class PaymentAuthComponent implements OnInit {
  message: any = ''
  constructor(public sanitizer: DomSanitizer) {
    var data: any = localStorage.getItem('message')
    this.message = this.sanitizer.bypassSecurityTrustHtml(JSON.parse(data));
  }

  ngOnInit(): void {
  }

}
