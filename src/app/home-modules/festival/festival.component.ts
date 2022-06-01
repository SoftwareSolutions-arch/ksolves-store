import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/services.service';
import { ToasterPosition } from '../../positionClass';
import { privateKey } from '../../config';
import jwt_decode from "jwt-decode";
import { PaymentServicesService } from 'src/app/payment-checkout/payment-services.service';
import { Title } from '@angular/platform-browser';
const sign = require('jwt-encode');
import { environment} from '../../../environments/environment.stagging'

@Component({
  selector: 'app-festival',
  templateUrl: './festival.component.html',
  styleUrls: ['./festival.component.scss']
})
export class FestivalComponent implements OnInit {
  baseUrl: any = '';
  categoriesPasses: any = '';
  filterObj: any = {};
  allProdcuts: any = '';
  pagination: any = [];
  categories: any = [];
  versions: any = [];
  data: any[] = [];
  versionFitervalue: any[] = [];
  selectedsortBy: string = 'website_sequence+asc';
  totaldisplayValue: any;
  globalQuery = '';
  search_count: any = ''
  odopAppsLength: any = 0;
  magento_apps_length: any = 0;
  odooThemes: any = 0;
  terms_condition: any = '';
  banner_text: any = '';
  bannerData: any = '';
  isLoadingBool: boolean = false;
  sortbylebel: any;
  currentCompany: any = '';
  emptyBoxShow: boolean = false;
  environment:any='';
  selectedsortByDDlist = [
    { value: 'website_sequence+asc', key: 'Relevance or Popularity' },
    { value: 'ks_display_price+desc', key: 'Price: High to Low' },
    { value: 'ks_display_price+asc', key: 'Price: Low to High' },
    { value: 'name+asc', key: 'Name - A to Z' },
    { value: 'name+desc', key: 'Name - Z to A' }
  ];

  constructor(public service: ServicesService, public title: Title
    , private paymentService: PaymentServicesService, public toast: ToastrService,
    public router: Router, private activatedRoter: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.baseUrl = this.service.baseurl;
    this.environment=environment.front_end_url
    var data = localStorage.getItem('tokenGenerated');
    if (data == 'false' || data == null) {
      this.generateToken();
    }
  }

  ngOnInit(): void {
    this.title.setTitle('Festival-Sale | Ksolves-store');
    this.activatedRoter.queryParams.subscribe(data => {
      this.filterObj = data;
      this.globalQuery = data.search || '';
      this.totaldisplayValue = data.ppg;
      this.getShoppageProducts();
      this.getcurrentCurrency()
    })
  }

  setCategoriesHighLight() {
    if (this.categoriesPasses == "festive_sale") {
      this.currentCompany = 'All'
    }
    if (this.categoriesPasses == "festive_sale/category/odoo-accounting-14") {
      this.currentCompany = 'Accounting'
    }
    if (this.categoriesPasses == "festive_sale/category/odoo-crm-26") {
      this.currentCompany = 'CRM'
    }
    if (this.categoriesPasses == "festive_sale/category/odoo-inventory-27") {
      this.currentCompany = 'Inventory'
    }
    if (this.categoriesPasses == "festive_sale/category/odoo-point-of-sale-16") {
      this.currentCompany = 'Point Of Sale'
    }
    if (this.categoriesPasses == "festive_sale/category/odoo-sales-11") {
      this.currentCompany = 'Sales'
    }
    if (this.categoriesPasses == "festive_sale/category/odoo-sales-management-18") {
      this.currentCompany = 'Sales Management'
    }
    if (this.categoriesPasses == "festive_sale/category/odoo-tools-8") {
      this.currentCompany = 'Tools'
    }
    if (this.categoriesPasses == "festive_sale/category/odoo-warehouse-20") {
      this.currentCompany = 'Warehouse'
    }
    if (this.categoriesPasses == "festive_sale/category/odoo-website-10") {
      this.currentCompany = 'Website'
    }
    if (this.categoriesPasses == "festive_sale/category/odoo-migration-56") {
      this.currentCompany = 'Migration'
    }


    // highlighet categories for megento app
    if (this.categoriesPasses == "shop/magento-apps") {
      this.currentCompany = 'All'
    }
    if (this.categoriesPasses == "shop/magento-apps/category/magento-sales-37") {
      this.currentCompany = 'Sales'
    }
    if (this.categoriesPasses == "shop/magento-apps/category/magento-ecommerce-38") {
      this.currentCompany = 'Ecommerce'
    }
  }

  getShoppageProducts() {
    let str = this.router.url.split('?')[0];
    str = str.substring(1)
    this.categoriesPasses = str;
    this.setCategoriesHighLight()

    this.isLoadingBool = true;
    this.emptyBoxShow = false

    this.service.get5(this.categoriesPasses, { ...this.filterObj }).subscribe(res => {
      this.isLoadingBool = false
      this.allProdcuts = res.products;
      this.bannerData = res.banner
      this.odopAppsLength = this.allProdcuts.odoo_apps.length;
      this.magento_apps_length = this.allProdcuts.magento_apps.length
      this.odopAppsLength = this.allProdcuts.odoo_apps.length;
      this.odooThemes = this.allProdcuts.odoo_themes.length
      this.pagination = res.pagination;
      this.categories = res.category_section.categories;
      this.versions = res.version_section;
      this.search_count = res.page_header.product_count;
      this.terms_condition = this.sanitizer.bypassSecurityTrustHtml(res.terms_conditions);
      this.banner_text = this.sanitizer.bypassSecurityTrustHtml(res.banner.banner_text);
      if (this.allProdcuts.magento_apps.length == 0 && this.allProdcuts.odoo_apps.length == 0 && this.allProdcuts.odoo_themes.length == 0) {
        this.emptyBoxShow = true
      }
    })
  }

  generateToken() {
    this.service.get4('custom/web/login', 'response').subscribe(result => {
      localStorage.setItem('tokenGenerated', 'true');
      localStorage.setItem('csrf_token', result.body.csrf);
      var decoding_data: any = this.decodingData(result.headers.get('authorization').replace('Bearer ', '')); // decoding data
      var encoding_data: any = this.encodingData({ "session_id": decoding_data.session_id });                 // encoding data
      localStorage.setItem('sessionId', encoding_data);
    })
  }

  // update header data
  callMethod(count: any) {
    this.paymentService.callComponentMethod(count);
  };

  getcurrentCurrency() {
    this.paymentService.componentMethodCalledLogin$.subscribe((data) => {
      this.getShoppageProducts();
    });
  }


  // encoding data
  encodingData(token: any) {
    return sign(token, privateKey, { alg: "HS256" });
  }

  // decoding data
  decodingData(token: any) {
    return jwt_decode(token);
  }

  //Search function
  searchfilter(name: string) {
    if (name === 'search') {
      this.filterObj = { ...this.filterObj, ...{ search: this.globalQuery } };
    }
    this.getShoppageProducts();
    if (this.categories != null) {
      this.router.navigate([this.categoriesPasses], {
        queryParams: this.filterObj
      })
    } else {
      this.router.navigate(['/odoo-apps'], {
        queryParams: this.filterObj
      })
    }
  }

  //Method for Categories filter data
  getProductBycategories(pro: any) {
    this.categoriesPasses = pro.split('?')[0];
    this.router.navigate([this.categoriesPasses], {
      queryParams: this.filterObj
    }).then(() => {
      this.getShoppageProducts();
    })
    return false;
  }

  //version filter 
  fiterVersion(event: any) {
    if (event.target.checked === false) {
      this.data.push({ v: event.target.value });
      localStorage.setItem('versions', JSON.stringify(this.data))
    } else {
      let checkedValue = event.target.value
      this.versionFitervalue = JSON.parse(localStorage.getItem('versions')!);
      this.data = this.versionFitervalue.filter(event => event.v != checkedValue);
      localStorage.setItem('versions', JSON.stringify(this.data))
    }

    this.versionFitervalue = JSON.parse(localStorage.getItem('versions')!);
    for (let k = 0; k < this.versionFitervalue.length; k++) {
      this.versionFitervalue[k] = this.versionFitervalue[k].v;
    }

    this.filterObj = {
      ...this.filterObj,
      ...{ ppg: this.totaldisplayValue },
      ...{ versions: this.versionFitervalue.toString() },
      ...{ search: this.globalQuery },
      ...{ order: this.selectedsortBy },
      // ...{ category: this.categories[0].id }
    };

    if (this.categories != null) {
      this.router.navigate([this.categoriesPasses], {
        queryParams: this.filterObj
      })
    } else {
      this.router.navigate(['/festive_sale'], {
        queryParams: this.filterObj
      })
    }
  }

  addTowishlist(item: any) {
    this.isLoadingBool = true;
    this.service.getAllData('shop/wishlist/add?product_id=' + item.product_var_id).subscribe(result => {
      this.isLoadingBool = false;
      if (result.product_added == true) {
        this.callMethod('');
        this.toast.success("Product added in Wishlist");
        this.getShoppageProducts();
      }
    })
  }

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

  isProductFree(price: any): boolean {
    if (price === '$ 0.0' || price === '0.0 €' || price === '0.0 ₹') {
      return true;
    }
    return false;
  }

  // move to odoo details page
  detailPage(item: any) {
    let urld = item.product_href.split('/')[3];
    var data = item.product_href.split('/')[2];
    this.router.navigate([`../shop/${data}/${urld}`])
    return false;
  }

  // sort Product in Ascending order
  sortProductascending(event: any) {
    this.selectedsortBy = event;
    this.sortbylebel = this.selectedsortByDDlist.filter(e => e.value === this.selectedsortBy)[0]
    this.filterObj = {
      ...this.filterObj,
      ...{ ppg: this.totaldisplayValue },
      ...{ versions: this.versionFitervalue.toString() },
      ...{ search: this.globalQuery },
      ...{ order: this.selectedsortBy },
    }
    this.getShoppageProducts();
    if (this.categories != null) {
      this.router.navigate(['/festive_sale'], {
        queryParams: this.filterObj
      })
    } else {
      this.router.navigate(['/festive_sale'], {
        queryParams: this.filterObj
      })
    }
  }
}