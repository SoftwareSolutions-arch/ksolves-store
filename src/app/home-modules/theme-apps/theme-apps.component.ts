import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ToasterPosition } from 'src/app/positionClass';
import { Router } from '@angular/router';
import { privateKey } from '../../config';
import { PaymentServicesService } from 'src/app/payment-checkout/payment-services.service';
const sign = require('jwt-encode');
import jwt_decode from "jwt-decode";
import { Meta, Title } from '@angular/platform-browser';
import { environment} from '../../../environments/environment.stagging'

@Component({
  selector: 'app-theme-apps',
  templateUrl: './theme-apps.component.html',
  styleUrls: ['./theme-apps.component.scss']
})

export class ThemeAppsComponent implements OnInit, AfterContentInit {
  customOptions: OwlOptions = {
    loop: true,
    margin: 50,
    autoplay: false,
    center: false,
    dots: false,
    navText: ["<img src='./../../assets/images/suggested-app/left.svg' width='40' height='40' alt='left arrow'>", "<img src='./../../assets/images/suggested-app/right.svg' width='40' height='40' alt='right arrow'>"],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1200: {
        items: 3.5
      },
      1400: {
        items: 3.75
      }
    },
    nav: true
  }

  topTenProducts: any = [];
  themeAndProducts: any = [];
  my_theme_products: any = [];
  baseUrl: any = '';
  isLoadingBool: boolean = false;
  isMobile = false;
  my_theme_products_1: any = '';
  my_theme_products_2: any = '';
  my_theme_products_3: any = '';
  environment:any='';

  constructor(public service: ServicesService, private meta: Meta, private paymentService: PaymentServicesService,
    public router: Router, public toast: ToastrService, public http: HttpClient, public title: Title) {
    this.baseUrl = this.service.baseurl;
    this.environment=environment.front_end_url
    this.tokenStatus();
    this.title.setTitle('Odoo Apps | Odoo ERP Module | Magento 2 Extension - Ksolves Store');
    this.meta.updateTag({ name: 'description', content: 'Ksolves Store–Growth-Minded Businesses’ Marketplace for Powerful Odoo Apps, Innovative Magento 2 Extensions, & Industry Leading Themes.' })
  }

  ngOnInit(): void {
    this.loadScript()
    this.themeandProducts();
    this.getcurrentCurrency();
    this.updateLogout()
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

  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 769;
    if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
  }

  loadScript() {
    let node = document.createElement('script'); // creates the script tag
    node.src = `<script type="application/ld+json">
    {
      "@context": "https://schema.org/",
      "@type": "WebSite",
      "name": "Ksolves Store",
      "url": "https://store.ksolves.com/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://store.ksolves.com/shop?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
    </script>
    `;
    // sets the source (insert url in between quotes)
    node.type = 'text/javascript'; // set the script type
    node.async = true; // makes script run asynchronously
    node.charset = 'utf-8';
    // append to head of document
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  goToProduct(item: any) {
    let urld = item.product_href.split('/')[3];
    var data = item.product_href.split('/')[2];
    this.router.navigate([`../shop/${data}/${urld}`])
    return false;
  }

  tokenStatus() {
    var data = localStorage.getItem('tokenGenerated');
    if (data == 'false' || data == null) {
      this.generateToken();
    }
  }

  generateToken() {
    localStorage.setItem('tokenGenerated', 'true');
    this.isLoadingBool = false;
    this.service.get4('custom/web/login', "response").subscribe(result => {
      this.isLoadingBool = false;
      localStorage.setItem('csrf_token', result.body.csrf);
      var decoding_data: any = this.decodingData(result.headers.get('authorization').replace('Bearer ', '')); // decoding data
      var encoding_data: any = this.encodingData({ "session_id": decoding_data.session_id });                 // encoding data
      localStorage.setItem('sessionId', encoding_data);
    })
  }

  getcurrentCurrency() {
    this.paymentService.componentMethodCalledLogin$.subscribe((data) => {
      this.themeandProducts();
    });
  }

  updateLogout() {
    this.paymentService.componentMethodCalledChangedMain$.subscribe((data) => {
      this.themeandProducts();
    });
  }

  themeandProducts() {
    this.service.getAllData('theme_and_recommended_products').subscribe(result => {
      this.themeAndProducts = result.ks_themes;
      this.my_theme_products_1 = this.themeAndProducts[1];
      this.my_theme_products_2 = this.themeAndProducts[2];
      this.my_theme_products_3 = this.themeAndProducts[3];
      for (let index = 1; index < this.themeAndProducts.length; index++) {
        this.my_theme_products.push(this.themeAndProducts[index])
      }
    })
    this.service.getAllData('top_10_products').subscribe(result => {
      this.topTenProducts = result;
      this.isLoadingBool = false;
    })
  }

  addTowishlist(item: any) {
    if (item.in_wish == true) {
      return
    }
    this.isLoadingBool = true;
    this.service.getAllData('shop/wishlist/add?product_id=' + item.product_var_id).subscribe(result => {
      if (result.product_added == true) {
        this.callMethod('');
        this.toast.success("Product added");
        item.in_wish=true;
        this.isLoadingBool = false;
      }
    })
  }

  //add to card method
  onSubmit(item: any) {

    this.isLoadingBool = true;
    var formData = new FormData();
    formData.append("product_id", item.product_var_id);
    this.service.post('shop/product/cart/update', formData).subscribe(result => {
      this.isLoadingBool = false;
      this.callMethod('');
      this.service.success('', 'Item added successfully', ToasterPosition.bottomLeft);
      item.in_cart = true;
    })
  }

  goToCart(){
    this.router.navigate(['/payment-confirmation/payment']);
  }

  //add to card method
  add_to_card(item: any) {
    this.isLoadingBool = true;
    var data = localStorage.getItem('tokenGenerated');
    if (data == 'false' || data == null) {
      localStorage.setItem('tokenGenerated', 'true');
      this.service.get4('custom/web/login', "response").subscribe(result => {
        this.isLoadingBool = false;
        localStorage.setItem('csrf_token', result.body.csrf);
        var decoding_data: any = this.decodingData(result.headers.get('authorization').replace('Bearer ', '')); // decoding data
        var encoding_data: any = this.encodingData({ "session_id": decoding_data.session_id });                 // encoding data
        localStorage.setItem('sessionId', encoding_data);
        var formData = new FormData();
        formData.append("product_id", item.product_var_id);
        this.service.post('shop/product/cart/update', formData).subscribe(result => {
          this.callMethod('');
          this.isLoadingBool = false;
          this.service.success('', 'Item added successfully', ToasterPosition.bottomLeft);
        })
      })
    }

    else {
      var formData = new FormData();
      formData.append("product_id", item.product_var_id);
      this.service.post('shop/product/cart/update', formData).subscribe(result => {
        this.callMethod('');
        this.isLoadingBool = false;
        this.service.success('', 'Item added successfully', ToasterPosition.bottomLeft);
      })
    }
  }

  isProductFree(price: any): boolean {
    if (price === '$ 0.0' || price === '0.0 €' || price === '0.0 ₹') {
      return true;
    }
    return false;
  }

  // buy now
  buy_now(item: any) {
    this.isLoadingBool = true;
    var formData = new FormData();
    formData.append("product_id", item.product_var_id);
    this.service.post('shop/product/cart/update', formData).subscribe(result => {
      this.callMethod('');
      this.isLoadingBool = false;
      this.router.navigate(['/payment-confirmation/payment']);
    })
  }

  buy_now_ninja() {
    this.isLoadingBool = true;
      var formData = new FormData();
      formData.append("product_id", '342');
      this.service.post('shop/product/cart/update', formData).subscribe(result => {
        this.callMethod('');
        this.isLoadingBool = false;
        this.router.navigate(['/payment-confirmation/payment']);
      })
  }

  // encoding data
  encodingData(token: any) {
    return sign(token, privateKey, { alg: "HS256" });
  }

  // decoding data
  decodingData(token: any) {
    return jwt_decode(token);
  }

  // update header data
  callMethod(count: any) {
    this.paymentService.callComponentMethod(count);
  };
}