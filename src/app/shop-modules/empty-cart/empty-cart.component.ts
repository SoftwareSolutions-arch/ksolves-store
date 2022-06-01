import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrls: ['./empty-cart.component.scss']
})
export class EmptyCartComponent implements OnInit {

  constructor(public title: Title) { 
    this.title.setTitle('Empty-cart | Ksolves-store');
  }

  ngOnInit(): void {
  }

}
