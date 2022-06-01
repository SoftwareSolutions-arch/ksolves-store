import { Component, OnInit, Output } from '@angular/core';
// import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  // free_days_support: any = '';
  constructor() { }

  ngOnInit(): void {
    // this.service.getAllData('ks_get_home_banner_products').subscribe(res => {
    //   this.free_days_support = res[1].res_company.free_support_days;
    //   localStorage.setItem('free_days_support', this.free_days_support)
    // })
  }

}
