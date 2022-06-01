import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-empty-wishlist',
  templateUrl: './empty-wishlist.component.html',
  styleUrls: ['./empty-wishlist.component.scss']
})
export class EmptyWishlistComponent implements OnInit {

  constructor(public title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Empty-wishlist | Ksolves-store');
  }

}
