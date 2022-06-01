import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PaymentServicesService } from 'src/app/payment-checkout/payment-services.service';
import { ToasterPosition } from 'src/app/positionClass';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-suggested-app',
  templateUrl: './suggested-app.component.html',
  styleUrls: ['./suggested-app.component.scss']
})
export class SuggestedAppComponent implements OnInit {
  isMobile = false;
  customOptions: OwlOptions = {
    loop: true,
 
    autoplay: true,
    dots: false,
    margin:10,
    
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      }
    },
  }

  themeAndProducts: any = [];
  baseUrl: any = '';
  product_var_id: any = '';
  product_var_id1: any = '';
  product_var_id2: any = '';
  product_var_id3: any = '';
  product_var_id4: any = '';
  product_var_id5: any = '';
  isLoadingBool: boolean = true;
  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 769;
    if (w < breakpoint) {
      return true;
    } else {
      return false;
  
    }}
  constructor(public service: ServicesService, private paymentService: PaymentServicesService) {
    this.baseUrl = this.service.baseurl;
    this.themeandRecommededProducts();
  }

  ngOnInit(): void {
    this.getcurrentCurrency();
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };
  }

  ngAfterContentInit() { 
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
        this.isMobile = this.getIsMobile();
    }; 
  }

  getcurrentCurrency() {
    this.paymentService.componentMethodCalledLogin$.subscribe((data) => {
      this.themeandRecommededProducts();
    });
  }

  themeandRecommededProducts() {
    this.service.getAllData('theme_and_recommended_products').subscribe(result => {
      this.themeAndProducts = result.recommended_products;
      this.product_var_id = this.themeAndProducts[0].product_var_id;
      this.product_var_id1 = this.themeAndProducts[1].product_var_id;
      this.product_var_id2 = this.themeAndProducts[2].product_var_id;
      this.product_var_id3 = this.themeAndProducts[3].product_var_id;
      this.product_var_id4 = this.themeAndProducts[4].product_var_id;
      this.product_var_id5 = this.themeAndProducts[5].product_var_id;
      this.isLoadingBool = false;
    })
  }

  //add to card method
  addto_card(item: any) {
    var formData = new FormData();
    formData.append("product_id", item);
    this.service.post('shop/product/cart/update', formData).subscribe(result => {
      this.callMethod('');
      this.service.success('', 'Item added successfully', ToasterPosition.bottomLeft);
    })
  }

  // update header data
  callMethod(count: any) {
    this.paymentService.callComponentMethod(count);
  };

}
