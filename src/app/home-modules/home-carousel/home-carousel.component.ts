import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent implements OnInit {
  bannerProducts: any = [];
  baseUrl: any = '';
  front_end_url = "";
  isLoadingBool: boolean = true;
  bannerProducts_first: any = '';
  bannerProducts_second: any = '';
  bannerProducts_third: any = '';

  constructor(public service: ServicesService) {
    this.baseUrl = this.service.baseurl;
    this.front_end_url = this.service.front_end_url;
  }

  ngOnInit(): void {
    this.isLoadingBool = false;
    this.service.getAllData('ks_get_home_banner_products').subscribe(res => {
       this.bannerProducts=res[0].Slider_product;
    })
  }

}
