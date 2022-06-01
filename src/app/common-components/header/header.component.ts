import { flatten } from '@angular/compiler';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentServicesService } from 'src/app/payment-checkout/payment-services.service';
import { ServicesService } from 'src/app/services.service';
import { NavigationService } from 'src/app/_services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
  
export class HeaderComponent implements OnInit {
  reload() {
    throw new Error('Method not implemented.');
  }
  free_days_support: any = '';
  navbarfixed: boolean = false;
  isLogout: any = '';
  baseUrl: any = '';
  cart_products: any = [];
  cart_quantity: any;
  cart_summary: any;
  wishlist_qty: any = 0;
  cart_qty: any;
  isLogIn: any;
  pricelist_section: any = '';
  isLoadingBool: boolean = false;
  searchSomething: boolean = true;
  globalQuery = '';
  filterObj: any = {}
  current_price: any = "";
  closesearch: boolean = true;
  isPopdataloaded: boolean = true;
  showFestivalMenu: any = '';
  magento_child_menus: any = '';
  odoo_child_menus: any = '';
  isMobile = false;

  @ViewChild('userName') userName: any = ElementRef;
  @ViewChild('addAdmin') private addAdmin: any = ElementRef;
  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 100) {
      this.navbarfixed = true;
    }
    else {
      this.navbarfixed = false;
    }
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

  constructor(public router: Router,
    public toast: ToastrService,
    private paymentService: PaymentServicesService,
    public service: ServicesService,
    private navigation: NavigationService
  ) {
    this.baseUrl = this.service.baseurl;
    this.free_days_support = localStorage.getItem('free_days_support');
    this.isLogout = localStorage.getItem('isLogout') ? null : '0';
    this.updateCount();
    this.isLogin();
  }

  ngOnInit(): void {
    this.getTowishlist()
    var url_1 = window.location.href;
    if (url_1.indexOf('/payment-confirmation/confirm') < 0) {
      this.getcartsData();
    }
    this.current_Price();
    this.isMobile = this.getIsMobile()
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

  // go to the odoo all products
  goToOdooApps(item: any) {
    localStorage.setItem('myValue','0');
    var data = item.split('?')[0];
    this.paymentService.tempData(data.substring(1))
    this.router.navigate([data])
    this.paymentService.callComponentMethodChanged();
  }

  // go to the odoo all magento
  goToMagentoApps() {
    localStorage.setItem('myValue','0');
    this.paymentService.tempData('shop/magento-apps')
    this.router.navigate(['/shop/magento-apps'])
    this.paymentService.callComponentMethodChanged();
  }

  // go to the themes
  gotoThemes() {
    localStorage.setItem('myValue','0');
    this.paymentService.tempData("shop/odoo-themes")
    this.router.navigate(['/shop/odoo-themes']);
    this.paymentService.callComponentMethodChanged();
  }

  closeSearchBar() {
    this.globalQuery = '';
    this.searchSomething = true;
  }

  openSearchBar() {
    this.searchSomething = false;
    setTimeout(() => this.userName.nativeElement.focus());
  }

  // get currency change 
  getCurrency(currency: any) {
    this.isLoadingBool = true;
    var formData = new FormData();
    formData.append("pl_id", currency.id);
    this.service.post('custom/shop/change_pricelist', formData).subscribe(result => {
      this.isLoadingBool = false;
      this.getTowishlist();
      this.callMethod();
      this.getcartsData()
    })
  }

  // get wishlist data page
  getTowishlist() {
    this.service.getAllData('header_data').subscribe(result => {
      localStorage.setItem('isLogin', result.login)
      this.wishlist_qty = result.wishlist_qty;
      this.cart_qty = result.cart_qty;
      this.isLogIn = result.login;
      this.pricelist_section = result.pricelist_section;
      this.showFestivalMenu = result.show_festive_menu;
      this.odoo_child_menus = result.odoo_child_menus;
      this.magento_child_menus = result.magento_child_menus;
    })
  }

  // get card data 
  getcartsData() {
    this.service.get4('shop/cart' + '?type=popover', 'response').subscribe(resp => {
      var res: any = resp.body
      this.cart_products = res.cart_products;
      this.cart_quantity = res.cart_quantity;
      this.cart_summary = res.cart_summary;
      this.isPopdataloaded = false
    })
  }
  
  // do logout session and route to home page
  logOut() {
    this.isLogIn = false;
    this.service.getAllData('web/session/logout').subscribe(result => {
      localStorage.clear();
      this.getTowishlist();
      this.toast.success("Logout successfully");
      this.router.navigate(['']);
      this.paymentService.callMainPage()
    })
  }

  navigateToLogin() {
    if (this.isLogIn == false) {
      this.router.navigate(['registration/login']);
    }
  }

  // go to the details of product page
  detailPage(item: any) {
    let urld = item.href.split('/')[3];
    this.router.navigate([`../shop/odoo-apps/${urld}`])
    return false;
  }

  updateCount() {
    this.paymentService.componentMethodCalled$.subscribe((data) => {
      this.getTowishlist();
    });
  }

  isLogin() {
    this.paymentService.componentMethodCalledLogin$.subscribe((data) => {
      this.getTowishlist();
    });
  }

  // update header data
  callMethod() {
    this.paymentService.callComponentMethodLogin();
  };

  //Search function
  searchfilter(name: string) {
    if (name === 'search') {
      this.filterObj = {
        'search': this.globalQuery
      }
    }
    this.router.navigate(['shop'], {
      queryParams: this.filterObj
    })
  }

  // current price
  current_Price() {
    this.service.get4('company_stock_price').subscribe(res => {
      this.current_price = res;
    })
  }

  clickedLogo() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
