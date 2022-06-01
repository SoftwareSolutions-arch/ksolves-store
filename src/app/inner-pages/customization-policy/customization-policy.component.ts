import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-customization-policy',
  templateUrl: './customization-policy.component.html',
  styleUrls: ['./customization-policy.component.scss']
})
export class CustomizationPolicyComponent implements OnInit {

  constructor(public title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Customization-policy | Ksolves-store');
  }

}
