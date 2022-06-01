import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  cookies_section: boolean = false;

  constructor(public service: ServicesService) {
    this.cookiesShow();
  }

  ngOnInit(): void {
  }

  close_cookie() {
    this.cookies_section = true;
    localStorage.setItem('isCookiesSelected', 'true')
  }

  cookiesShow() {
    var data: any = localStorage.getItem('isCookiesSelected');
    if (data == "!true" || data == null) {
      this.cookies_section = false;
    }
    else {
      this.cookies_section = true;
    }
  }

  accept_cookies() {
    this.service.get4('ks_website_cookie_notice/ok').subscribe(result => {
      if(result.result=="ok"){
        localStorage.setItem('isCookiesSelected', 'true')
        this.cookies_section = true;
      }
    })
  }

}
