import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-cookies-policy',
  templateUrl: './cookies-policy.component.html',
  styleUrls: ['./cookies-policy.component.scss']
})
export class CookiesPolicyComponent implements OnInit {

  constructor(public title: Title,private metaService: Meta) {
    this.metaService.addTag({ name: 'description', content: 'Article Description' });
    this.metaService.addTag({ name: 'robots', content: 'index,follow' });
    this.metaService.addTag({ property: 'og:title', content: 'Content Title for social media' });
   }

  ngOnInit(): void {
    this.title.setTitle('Cookies-policy | Ksolves-store');
  }

}
