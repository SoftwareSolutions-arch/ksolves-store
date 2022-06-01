import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-terms-and-policies',
  templateUrl: './terms-and-policies.component.html',
  styleUrls: ['./terms-and-policies.component.scss']
})
export class TermsAndPoliciesComponent implements OnInit {

  constructor(public title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Terms-and-conditions | Ksolves-store');
  }

}
