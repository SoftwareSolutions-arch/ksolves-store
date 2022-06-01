import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss']
})
export class SitemapComponent implements OnInit {

  constructor(public title: Title    ) { }

  ngOnInit(): void {
    this.title.setTitle('Sitemap | Ksolves-store');
  }

}
