import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-licence-agreement',
  templateUrl: './licence-agreement.component.html',
  styleUrls: ['./licence-agreement.component.scss']
})
export class LicenceAgreementComponent implements OnInit {

  constructor(public title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Licence-agreement | Ksolves-store');
  }

}
