import { Component, OnInit } from '@angular/core';
import { SupportComponent } from 'src/app/home-modules/support/support.component';
import { Title } from '@angular/platform-browser';
import { Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private metaService: Meta,public supportComponent:SupportComponent,public title: Title) { 
    this.metaService.addTag({ name: 'description', content: 'Article Description' });
    this.metaService.addTag({ name: 'robots', content: 'index,follow' });
    this.metaService.addTag({ property: 'og:title', content: 'Content Title for social media' });
  }

  ngOnInit(): void {
    this.title.setTitle('About-us | Ksolves-store');
  }

}
