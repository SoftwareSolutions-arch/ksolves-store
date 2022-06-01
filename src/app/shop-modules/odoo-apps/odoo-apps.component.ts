import { Component, OnInit, Output } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/services.service';
import { ToasterPosition } from '../../positionClass';
import { privateKey } from '../../config';
import jwt_decode from "jwt-decode";
import { PaymentServicesService } from 'src/app/payment-checkout/payment-services.service';
const sign = require('jwt-encode');
import { environment} from '../../../environments/environment.stagging'

@Component({
  selector: 'app-odoo-apps',
  templateUrl: './odoo-apps.component.html',
  styleUrls: ['./odoo-apps.component.scss']
})

export class OdooAppsComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    autoplay: true,
    center: true,
    navText: ["<img src='../../../assets/images/suggested-app/left.svg' width='40' height='40' alt='left arrow'>", "<img src='../../../assets/images/suggested-app/right.svg' width='40' height='40' alt='right arrow'>"],
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      700: {
        items: 3
      },
      1100: {
        items: 5
      },
      1400: {
        items: 5
      }
    },
    nav: true
  }
  selectedsortByDDlist = [
    { value: 'website_sequence+asc', key: 'Relevance or Popularity' },
    { value: 'ks_display_price+desc', key: 'Price: High to Low' },
    { value: 'ks_display_price+asc', key: 'Price: Low to High' },
    { value: 'name+asc', key: 'Name - A to Z' },
    { value: 'name+desc', key: 'Name - Z to A' }
  ];
  selectedsortBy: string = 'website_sequence+asc';
  selectedIndex: any = 0;
  scrollIndex = 0;

  isLoadingBool: boolean = true;
  isLoadingBool_second: boolean = true;
  status1: boolean = false;
  status2: boolean = false;
  status3: boolean = false;
  status4: boolean = false;
  status5: boolean = false;
  status6: boolean = false;

  allProdcuts: any = [];
  pagination: any = [];
  myItems: any = [];
  categories: any = [];
  versions: any = [];
  productList: any = [];
  versionFitervalue: any[] = [];
  data: any[] = [];
  baseUrl: any = '';
  sortbylebel: any;
  filterObj: any = {};
  totaldisplayValue: any = '';
  globalQuery = '';
  categoriesPasses: any = '';
  search_count: any = '';
  free_support_days: any = '';
  refund_validity: any = '';
  htmlData: any = '';
  category_content: any = '';
  lastString: any = '';
  currentCompany: any = '';
  myValue: any = '';
  environment: any = '';

  constructor(public service: ServicesService, private meta: Meta, private paymentService: PaymentServicesService, public toast: ToastrService,
    public router: Router, private activatedRoter: ActivatedRoute, private sanitizer: DomSanitizer, public title: Title) {
    this.baseUrl = this.service.baseurl;
    this.environment=environment.front_end_url
    var data = localStorage.getItem('tokenGenerated');
    if (data == 'false' || data == null) {
      this.generateToken();
    }
  }

  getcurrentCurrency() {
    this.paymentService.componentMethodCalledLogin$.subscribe((data) => {
      this.getShoppageProducts();
    });
  }

  clickEvent1() {
    this.status1 = !this.status1;
    this.status2 = false;
    this.status3 = false;
    this.status4 = false;
    this.status5 = false;
  }

  clickEvent2() {
    this.status2 = !this.status2;
    this.status1 = false;
    this.status3 = false;
    this.status4 = false;
    this.status5 = false;
  }

  clickEvent3() {
    this.status3 = !this.status3;
    this.status2 = false;
    this.status1 = false;
    this.status4 = false;
    this.status5 = false;
  }

  clickEvent4() {
    this.status4 = !this.status4;
    this.status2 = false;
    this.status3 = false;
    this.status1 = false;
    this.status5 = false;
  }

  clickEvent5() {
    this.status5 = !this.status5;
    this.status2 = false;
    this.status3 = false;
    this.status4 = false;
    this.status1 = false;
  }

  ngOnInit(): void {
    this.myValue = localStorage.getItem('myValue')
    this.paymentService.componentMethodCalledChangedTemp$.subscribe((data) => {
      this.categoriesPasses = data.count
    })
    this.paymentService.componentMethodCalledChanged$.subscribe((data) => {
      this.chagneDetection();
      return
    })
    let str = this.router.url.split('?')[0];

    str = str.substring(1);
    this.title.setTitle(str);
    this.categoriesPasses = str;
    this.setCategoriesHighLight();

    if (this.categoriesPasses == "shop/odoo-apps") {
      this.title.setTitle('Innovative 60+ Best Odoo Apps for Businesses-Ksolves Store');
      this.meta.updateTag({ name: 'description', content: 'Scale your business with top-notch 60+ best Odoo Apps offered by the Ksolves Store. Boost business efficiency, functionality, & revenue.' })
      // this.currentCompany = 'All'
    }

    if (this.categoriesPasses == "shop/odoo-apps/category/odoo-accounting-14") {
      this.title.setTitle('Top Class Odoo Accounting Apps–Ksolves Store');
      this.meta.updateTag({ name: 'description', content: 'Fall in love with the simplicity of managing and creating the vital financial reports with competitive Odoo Accounting Apps. ' })
      // this.currentCompany = 'Accounting'
    }


    if (this.categoriesPasses == "shop/magento-apps") {
      this.title.setTitle('Impactful Magento 2 Extensions for eCommerce–Ksolves Store');
      this.meta.updateTag({ name: 'description', content: 'Design a catchy eCommerce website with new generation Magento 2 Extensions and convert maximum leads effectively.' })
      // this.currentCompany = 'All'
    }

    if (this.categoriesPasses == "shop/odoo-themes") {
      this.title.setTitle('Amazing, Engaging, and Responsive Odoo Themes - Ksolves Store');
      this.meta.updateTag({ name: 'description', content: 'Increase business revenue by changing business structure with featured-rich Odoo themes powered by the Ksolves store.' })
    }

    this.activatedRoter.queryParams.subscribe(data => {
      this.filterObj = data;
      this.globalQuery = data.search || '';
      this.totaldisplayValue = data.ppg;
      this.sortbylebel = this.selectedsortByDDlist.filter(e => e.value === data.order)[0]
      if(this.myValue==1){
        this.filterDataPage('');
      }
      else{
        this.getShoppageProducts();
      }
      this.getcurrentCurrency()
    })
  }

  setCategoriesHighLight() {
    if (this.categoriesPasses == "shop/odoo-apps") {
      this.currentCompany = 'All'
    }
    if (this.categoriesPasses == "shop/odoo-apps/category/odoo-accounting-14") {
      this.currentCompany = 'Accounting'
    }
    if (this.categoriesPasses == "shop/odoo-apps/category/odoo-crm-26") {
      this.currentCompany = 'CRM'
    }
    if (this.categoriesPasses == "shop/odoo-apps/category/odoo-inventory-27") {
      this.currentCompany = 'Inventory'
    }
    if (this.categoriesPasses == "shop/odoo-apps/category/odoo-point-of-sale-16") {
      this.currentCompany = 'Point Of Sale'
    }
    if (this.categoriesPasses == "shop/odoo-apps/category/odoo-sales-11") {
      this.currentCompany = 'Sales'
    }
    if (this.categoriesPasses == "shop/odoo-apps/category/odoo-sales-management-18") {
      this.currentCompany = 'Sales Management'
    }
    if (this.categoriesPasses == "shop/odoo-apps/category/odoo-tools-8") {
      this.currentCompany = 'Tools'
    }
    if (this.categoriesPasses == "shop/odoo-apps/category/odoo-warehouse-20") {
      this.currentCompany = 'Warehouse'
    }
    if (this.categoriesPasses == "shop/odoo-apps/category/odoo-website-10") {
      this.currentCompany = 'Website'
    }
    if (this.categoriesPasses == "shop/odoo-apps/category/odoo-migration-56" || this.categoriesPasses == "shop/odoo-apps/category/odoo-migration-35") {
      this.currentCompany = 'Migration'
      this.lastString = 'Migration'
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

  chagneDetection() {
    this.allProdcuts = [];
    this.isLoadingBool = true;
    this.activatedRoter.queryParams.subscribe(data => {
      this.filterObj = data;
      this.globalQuery = data.search || '';
      this.totaldisplayValue = data.ppg;
      this.sortbylebel = this.selectedsortByDDlist.filter(e => e.value === data.order)[0]
      this.getShoppageProducts();
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

  // encoding data
  encodingData(token: any) {
    return sign(token, privateKey, { alg: "HS256" });
  }

  // decoding data
  decodingData(token: any) {
    return jwt_decode(token);
  }

  //Method for Categories filter data
  getProductBycategories(pro: any, name: any) {
    this.currentCompany = name;
    this.categoriesPasses = pro.split('?')[0];
    this.router.navigate([this.categoriesPasses], {
      queryParams: this.filterObj
    })
    this.getShoppageProducts();
    return false;
  }

  detailPage(item: any) {
    let urld = item.product_href.split('/')[2] + '/' + item.product_href.split('/')[3];
    localStorage.setItem('myValue','1');
    this.router.navigate([`../shop/${urld}`]);
    return false;
  }

  getShoppageProducts() {
    let data: any;
    if (this.categoriesPasses != null) {
      data = this.categoriesPasses;
    }
    else {
      data = 'shop/odoo-apps';
    }
    this.isLoadingBool = true;
    this.setCategoriesHighLight()
    this.service.get5(data, { ...this.filterObj }).subscribe(res => {
      this.isLoadingBool = false;
      this.isLoadingBool_second = false;
      this.allProdcuts = res[0].products;
      this.pagination = res[0].pagination;
      this.categories = res[0].categories;
      this.versions = res[0].versions;
      this.category_content = res[0].category_content;
      if (this.category_content == '<p><br></p>') {
        this.category_content = null
      }
      this.free_support_days = res[0].why_ksolves_and_offer.free_support_days;
      this.refund_validity = res[0].why_ksolves_and_offer.refund_validity;
      this.htmlData = this.sanitizer.bypassSecurityTrustHtml(res[0].category_content);
      if (this.totaldisplayValue == null || undefined) {
        this.totaldisplayValue = res[0].page_header.ppg;
      }
      this.search_count = res[0].page_header.page_result.search_count;
    })
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
      // ...{ category: ''}
    }
    this.getShoppageProducts();
    if (this.categories != null) {
      this.router.navigate([this.categoriesPasses], {
        queryParams: this.filterObj
      })
    } else {
      this.router.navigate(['shop/odoo-apps'], {
        queryParams: this.filterObj
      })
    }
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
      this.router.navigate(['shop/odoo-apps'], {
        queryParams: this.filterObj
      })
    }
  }

  isProductFree(price: any): boolean {
    if (price === '$ 0.0' || price === '0.0 €' || price === '0.0 ₹') {
      return true;
    }
    return false;
  }

  totalNumberItems(items: any) {
    this.totaldisplayValue = items;
    this.filterObj = {
      ...this.filterObj,
      ...{ ppg: items },
      ...{ versions: this.versionFitervalue.toString() },
      ...{ search: this.globalQuery },
      ...{ order: this.selectedsortBy },
      // ...{ category:datas}
    };
    this.getShoppageProducts();
    if (this.categories != null) {
      this.router.navigate([this.categoriesPasses], {
        queryParams: this.filterObj
      })
    } else {
      this.router.navigate(['shop/odoo-apps'], {
        queryParams: this.filterObj
      })
    }
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
      // ...{ category: datas }
    };
    this.getShoppageProducts();
    if (this.categories != null) {
      this.isLoadingBool = true
      this.allProdcuts = []

      this.router.navigate([this.categoriesPasses], {
        queryParams: this.filterObj
      })
    } else {
      this.router.navigate(['shop/odoo-apps'], {
        queryParams: this.filterObj
      })
    }
  }

  filterDataPage(item: any) {
  if(item){
    this.selectedIndex = item.num - 1;
    this.isLoadingBool = true;
    this.isLoadingBool_second = true;
    this.allProdcuts = [];
    let str = item.url;
    str = str.substring(1);
    localStorage.setItem('page_number',this.selectedIndex)
    localStorage.setItem('str',str)
    this.service.get3(str).subscribe(res => {
      this.isLoadingBool_second = false
      this.isLoadingBool = false;
      this.allProdcuts = res[0].products;
      this.pagination = res[0].pagination;
      this.categories = res[0].categories;
      this.versions = res[0].versions;
      this.totaldisplayValue = res[0].page_header.ppg;
      this.search_count = res[0].page_header.page_result.search_count;
    })
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
  }
    
  else{
    this.selectedIndex = Number(localStorage.getItem('page_number'))
    this.isLoadingBool = true;
    this.isLoadingBool_second = true;
    this.allProdcuts = [];
    var str = localStorage.getItem('str')
    this.service.get3(str).subscribe(res => {
      this.isLoadingBool_second = false
      this.isLoadingBool = false;
      this.allProdcuts = res[0].products;
      this.pagination = res[0].pagination;
      this.categories = res[0].categories;
      this.versions = res[0].versions;
      this.totaldisplayValue = res[0].page_header.ppg;
      this.search_count = res[0].page_header.page_result.search_count;
    })
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  }
  }

  nextPage() {
    this.isLoadingBool = true;
    this.isLoadingBool_second = true;
    this.allProdcuts = []
    this.selectedIndex = this.pagination.page_next.num - 1;
    let str = this.pagination.page_next.url;
    str = str.substring(1);
    this.service.get3(str).subscribe(res => {
      this.isLoadingBool = false
      this.isLoadingBool_second = false;
      this.allProdcuts = res[0].products;
      this.pagination = res[0].pagination;
      this.categories = res[0].categories;
      this.versions = res[0].versions;
      this.totaldisplayValue = res[0].page_header.ppg;
      this.search_count = res[0].page_header.page_result.search_count;
    })
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  previousPage() {
    this.isLoadingBool = true;
    this.isLoadingBool_second = true;
    this.allProdcuts = [];
    this.selectedIndex = this.pagination.page_previous.num - 1;
    let str = this.pagination.page_previous.url;
    str = str.substring(1);
    this.service.get3(str).subscribe(res => {
      this.isLoadingBool = false
      this.isLoadingBool_second = false;
      this.allProdcuts = res[0].products;
      this.pagination = res[0].pagination;
      this.categories = res[0].categories;
      this.versions = res[0].versions;
      this.totaldisplayValue = res[0].page_header.ppg;
      this.search_count = res[0].page_header.page_result.search_count;
    })
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
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

  addTowishlist(item: any) {
    if (item.in_wish == true) {
      return
    }
    this.isLoadingBool = true;
    this.service.getAllData('shop/wishlist/add?product_id=' + item.product_var_id).subscribe(result => {
      this.isLoadingBool = false;
      if (result.product_added == true) {
        this.callMethod('');
        item.in_wish = true;
        this.toast.success("Product added in Wishlist");
        // We can remove the below API call once we fix the browser cache issue.
        let data: any;
        if (this.categoriesPasses != null) {
          data = this.categoriesPasses;
        } else {
          data = 'shop/odoo-apps';
        }
        this.service.get5(data, { ...this.filterObj }).subscribe(res => {
        });
      }
    }, () => {
      this.isLoadingBool = false;
      this.toast.error("Problem while adding item to Wishlist");
    })
  }

  buy_now(item: any) {
    var formData = new FormData();
    formData.append("product_id", item.product_var_id);
    this.service.post('shop/product/cart/update', formData).subscribe(result => {
      this.callMethod('');
      this.router.navigate(['/payment-confirmation/payment']);
    })
  }

  goToCart() {
    this.router.navigate(['/payment-confirmation/payment']);
  }

  // update header data
  callMethod(count: any) {
    this.paymentService.callComponentMethod(count);
  };
}