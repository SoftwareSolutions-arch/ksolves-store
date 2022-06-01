import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-payment-processing',
  templateUrl: './payment-processing.component.html',
  styleUrls: ['./payment-processing.component.scss']
})
export class PaymentProcessingComponent implements OnInit {
  innerHTML: any = '';
  action_url: any = '';

  @ViewChild('myFormPost') myFormPost: any = ElementRef;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.innerHTML = localStorage.getItem('paymentPage');
    this.action_url = $(this.innerHTML).find('input[name="data_set"]').data('actionUrl');
    this.innerHTML = this.sanitizer.bypassSecurityTrustHtml(this.innerHTML);
  }

  ngAfterViewInit() {
    this.myFormPost.nativeElement.submit();
  }
}
