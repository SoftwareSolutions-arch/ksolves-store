import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-refund-policy',
  templateUrl: './refund-policy.component.html',
  styleUrls: ['./refund-policy.component.scss']
})
export class RefundPolicyComponent implements OnInit {

  constructor(public title: Title) { 
    this.title.setTitle('Refund-policy | Ksolves-store');
  }

  ngOnInit(): void {
  }

}
