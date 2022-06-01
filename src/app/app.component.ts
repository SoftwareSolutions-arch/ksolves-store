import { Component } from '@angular/core';
// import * as AOS from 'aos';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'odooapp';

  constructor(public _router: Router, public _location: Location) {
  }
  onActivate() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngOnInit() {
    this.refresh()
  }

  refresh(): void {
    if (this._location.path() == '/error') {
      this._router.navigate(['']);
    }
  }

}
