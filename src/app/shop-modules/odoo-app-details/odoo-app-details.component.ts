import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PaymentServicesService } from 'src/app/payment-checkout/payment-services.service';
import { ServicesService } from 'src/app/services.service';
import { ToasterPosition } from 'src/app/positionClass';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-odoo-app-details',
  templateUrl: './odoo-app-details.component.html',
  styleUrls: ['./odoo-app-details.component.scss']
})
export class OdooAppDetailsComponent implements OnInit {

  displayStyle = "none";
  public shouldShow = true;
  public buttonName: any = 'Read More';
  public show: boolean = false;
  productdetails: any;
  product_description: any;
  communityedition: any;
  enterprise: any;
  product_description_brief: any;
  product_description_detail: any;
  user_guide_tab: any
  overview_tab: any;
  overall_ratings: any;
  ratingcount: any;
  rating_bar: any = [];
  setup_tab: any;
  previewtabID: any;
  messages: any = [];
  message_count: any;
  pdfdataIfram: any;
  productName: any;
  baseUrl;
  isLogin: any = '';
  rating_query: any = '';
  version: any = '';
  isLoadingBool: boolean = true;
  page = 1;
  count = 0;
  pageSize = 5;
  currentIndex = -1;
  product_id: any = null;
  shareUrl: any = '';
  productnameDetail: any = '';
  supportedVerison: any = '';
  demo_link: any = '';
  myData: any = [];
  inWishItems: boolean = false
  currentRate = 1;
  @ViewChild('userName') userName: any = ElementRef;


  constructor(public service: ServicesService, public myElement: ElementRef, private meta: Meta, public title: Title, private paymentService: PaymentServicesService,
    public router: Router, private sanitizer: DomSanitizer) {

    this.baseUrl = this.service.baseurl;
    this.isLogin = localStorage.getItem('isLogin');
    this.shareUrl = 'https://store.ksolves.com' + window.location.pathname
    const path = window.location.pathname.split('/');
    var str = path[path.length - 1];
    this.productName = 'shop/' + path[path.length - 2] + '/' + str;
    this.getProductsDetails();
    this.paymentFunction();
    this.title.setTitle(str + ' | Ksolves-store');
  }

  ngOnInit(): void {
    this.transform();
    this.getcurrentCurrency();
  }

  isProductFree(price: any): boolean {
    if (price === '$ 0.00' || price === '0.00 €' || price === '0.00 ₹') {
      return true;
    }
    return false;
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToReview() {
    if (this.isLogin == 'false') {
      this.router.navigate(['/registration/login'])
    }

    else {
      setTimeout(() => this.userName.nativeElement.focus());
    }
  }

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;

    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.service.success('', 'Copied successfully', ToasterPosition.bottomLeft);
  }

  // handling page events
  handlePageChange(event: any): void {
    this.page = event;
  }

  toggle() {
    this.show = !this.show;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "Read Less";
    else
      this.buttonName = "Read More";
  }

  isDetailDescriptionAvailable(): boolean {
    let productDesc = <HTMLElement>document.querySelector('span.app-sm-description-detail');
    if (productDesc && productDesc.innerText) {
      return true;
    }
    return false;
  }

  getProductsDetails() {
    if (this.productName == 'shop/odoo-apps/dashboard-ninja-25') {
      this.loadScript();
      this.title.setTitle('Dashboard Ninja-An Intellectual Odoo Dashboard by Ksolves Store');
      this.meta.updateTag({ name: 'description', content: 'Create stunning business reports with Dashboard Ninja App for Odoo. The Intellectual Odoo Dashboard Analytical tool for all sizes of businesses.' })

    }
    if (this.productName == 'shop/magento-apps/magento-2-multi-vendor-marketplace-extension-111') {
      this.title.setTitle('Magento 2 Multi-Vendor Marketplace Extension - Ksolves Store');
      this.meta.updateTag({ name: 'description', content: 'Convert your Magento 2 store into a whole new world of the business-oriented marketplace with Magento 2 Multi-Vendor Marketplace Extension.' })
      let node = document.createElement('script'); // creates the script tag
      node.src = `<script type="application/ld+json">
    {
      "@context": "https://schema.org/", 
      "@type": "Product", 
      "name": "Magento 2 Multi-Vendor Marketplace Extension",
      "image": "https://storeapi.ksolves.com/web/image/product.product/318/image?unique=014aea0",
      "description": "Convert your Magento 2 store into a whole new world of the business-oriented marketplace with Magento 2 Multi-Vendor Marketplace Extension.",
      "brand": {
        "@type": "Brand",
        "name": "Ksolves"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://store.ksolves.com/shop/magento-apps/magento-2-multi-vendor-marketplace-extension-111",
        "priceCurrency": "USD",
        "price": "149.91",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "ratingCount": "30"
      }
    }
    </script>`; // sets the source (insert url in between quotes)
      node.type = 'text/javascript'; // set the script type
      node.async = true; // makes script run asynchronously
      node.charset = 'utf-8';
      // append to head of document
      document.getElementsByTagName('head')[0].appendChild(node);

    }
    if (this.productName == 'shop/odoo-themes/kernel-enterprise-backend-theme-77') {
      this.title.setTitle('Kernel-Compatible Enterprise Odoo Backend Theme by Ksolves');
      this.meta.updateTag({ name: 'description', content: 'Increase business performance & user engagement with interactive UI of Kernel Enterprise Backend Theme for Odoo. ' })
      let node = document.createElement('script'); // creates the script tag
      node.src = `<script type="application/ld+json">
      {
        "@context": "https://schema.org/", 
        "@type": "Product", 
        "name": "Magento 2 Multi-Vendor Marketplace Extension",
        "image": "https://storeapi.ksolves.com/web/image/product.product/318/image?unique=014aea0",
        "description": "Convert your Magento 2 store into a whole new world of the business-oriented marketplace with Magento 2 Multi-Vendor Marketplace Extension.",
        "brand": {
          "@type": "Brand",
          "name": "Ksolves"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://store.ksolves.com/shop/magento-apps/magento-2-multi-vendor-marketplace-extension-111",
          "priceCurrency": "EUR",
          "price": "135.64",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "ratingCount": "30"
        }
      }
      </script>`;
      node.type = 'text/javascript'; // set the script type
      node.async = true; // makes script run asynchronously
      node.charset = 'utf-8';
      // append to head of document
      document.getElementsByTagName('head')[0].appendChild(node);
      this.title.setTitle('Magento 2 Multi-Vendor Marketplace Extension - Ksolves Store');
      this.meta.updateTag({ name: 'description', content: 'Convert your Magento 2 store into a whole new world of the business-oriented marketplace with Magento 2 Multi-Vendor Marketplace Extension.' })
    }
    this.service.get4(this.productName, 'response').subscribe(res => {
      console.log('res', res.body);
      this.productdetails = res.body.product_section;
      this.product_id = this.productdetails.image_and_share.product_variant_id;
      this.demo_link = this.productdetails.image_and_share.demo_link
      this.product_id= this.productdetails.image_and_share.product_variant_id
      this.demo_link = this.productdetails.image_and_share.demo_link;
      this.inWishItems = this.productdetails.name_and_description.in_wish
      this.productnameDetail = this.productdetails.name_and_description.product_name;
      this.supportedVerison = this.productdetails.edition_and_supported_version.supported_version
      this.communityedition = this.productdetails['edition_and_supported_version']['community-edition'];
      this.enterprise = this.productdetails['edition_and_supported_version']['enterprise-edition'];
      if (this.productdetails['name_and_description']['product_description_brief'] != false) {
        this.product_description_brief = this.sanitizer.bypassSecurityTrustHtml(this.productdetails['name_and_description']['product_description_brief']);
      }

      if (this.productdetails['name_and_description']['product_description_detail'] != false) {
        this.product_description_detail = this.sanitizer.bypassSecurityTrustHtml(this.productdetails['name_and_description']['product_description_detail']);

      }
      // product Description part
      this.product_description = res.body.product_description;
      this.messages = this.product_description.reviews_tab.messages;
      this.setup_tab = this.sanitizer.bypassSecurityTrustHtml(this.product_description['setup_tab']);
      this.user_guide_tab = this.sanitizer.bypassSecurityTrustHtml(this.product_description['user_guide_tab']);
      this.overview_tab = this.sanitizer.bypassSecurityTrustHtml(this.product_description['overview_tab']);
      this.overall_ratings = res.body.product_description.reviews_tab['overall_ratings'];
      this.ratingcount = res.body.product_description.reviews_tab['overall_ratings']['rating count'];
      this.rating_bar = res.body.product_description.reviews_tab['overall_ratings']['rating_bars'];
      this.message_count = res.body.product_description.reviews_tab.message_count;
      this.previewtabID = this.product_description.preview_tab?.id;
      this.version = this.productdetails.version.version_data;
      this.myData = [];
      this.version.forEach((element: any) => {
        if (element.currently_active == true) {
          this.myData.push(element)
        }
      });
      this.version.forEach((element: any) => {
        if (element.currently_active == false) {
          this.myData.push(element)
        }
      });
      this.isLoadingBool = false;
    })
  }

  loadScript() {
    let node = document.createElement('script');
    node.src = `<script type="application/ld+json">
    {
      "@context": "https://schema.org/", 
      "@type": "Product", 
      "name": "Dashboard Ninja",
      "image": "https://storeapi.ksolves.com/web/image/product.product/342/image?unique=014aea0",
      "description": "Create stunning business reports with Dashboard Ninja App for Odoo. The Intellectual Odoo Dashboard Analytical tool for all sizes of businesses.",
      "brand": {
        "@type": "Brand",
        "name": "Ksolves"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://store.ksolves.com/shop/odoo-apps/dashboard-ninja-25",
        "priceCurrency": "EUR",
        "price": "363",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.41",
        "ratingCount": "18"
      }
    }
    </script>`;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  transform() {
    this.pdfdataIfram = this.service.baseurl + 'web/static/lib/pdfjs/web/viewer.html?file=/web/content/' + this.previewtabID + '#zoom=100'
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfdataIfram);
  }

  // buy now items 
  buy_now(item: any) {
    var formData = new FormData();
    formData.append("product_id", this.product_id);
    this.service.post('shop/product/cart/update', formData).subscribe(result => {
      this.callMethod('');
      this.router.navigate(['/payment-confirmation/payment']);
    })
  }

  // add items to wishlist
  addTowishlist() {
    if (this.inWishItems == true) {
      return
    }

    else {
      this.isLoadingBool = true;
      this.service.getAllData('shop/wishlist/add?product_id=' + this.product_id).subscribe(result => {
        this.isLoadingBool = false;
        if (result.product_added == true) {
          this.inWishItems=true;
          this.callMethod('');
          // this.toast.success("Product added in Wishlist");
          // this.getShoppageProducts();
        }
      })
    }

  }

  // update header data
  callMethod(count: any) {
    this.paymentService.callComponentMethod(count);
  };

  // see cart items
  view_cart() {
    var data = localStorage.getItem('isLogin');
    if (data == 'true') {
      this.router.navigate(['/payment-confirmation/payment']);
    }
    else {
      this.router.navigate(['/registration/login']);
    }
  }

  //add to card method
  addTocart(item: any) {
    if (this.product_id == null) {
      this.product_id = item.image_and_share.product_variant_id
    }
    this.isLoadingBool = true;
    var formData = new FormData();
    formData.append("product_id", this.product_id);
    this.service.post('shop/product/cart/update', formData).subscribe(result => {
      this.isLoadingBool = false;
      this.callMethod('');
      this.service.success('', 'Item added successfully', ToasterPosition.bottomLeft);
    })
  }

  // submit your query here
  submitQuery() {
    if (this.rating_query == '') {
      this.service.error('', 'You need to write a review before submitting', ToasterPosition.topCenter);
      return;
    }

    var formData = new FormData();
    formData.append("rating_value", JSON.stringify(this.currentRate));
    formData.append("message", this.rating_query);
    formData.append("res_id", this.productdetails.ks_product_template);
    formData.append("res_model", 'product.template');
    this.service.post('custom/mail/chatter_post', formData).subscribe(result => {
      this.currentRate = 1
      this.rating_query = '';
      this.service.success('', 'Review added', ToasterPosition.bottomLeft);
      this.messages = result.body.reviews.messages;
      this.overall_ratings = result.body.reviews['overall_ratings'];
      this.ratingcount = result.body.reviews['overall_ratings']['rating count'];
      this.rating_bar = result.body.reviews['overall_ratings']['rating_bars'];
    })
  }

  // change your version
  changeVersion(event: any) {
    this.isLoadingBool = true;
    var formData = new FormData();
    formData.append("product_variant", event.target.value);
    this.service.post('change_variant', formData).subscribe(result => {
      this.isLoadingBool = false;
      this.demo_link = result.body.product_section.image_and_share.demo_link;
      this.inWishItems = result.body.product_section.name_and_description.in_wish
      this.product_id = result.body.product_section.image_and_share.product_variant_id;
      this.productnameDetail = result.body.product_section.name_and_description.product_name;
      this.supportedVerison = result.body.product_section.edition_and_supported_version.supported_version;
      this.product_description = result.body.description;
      this.setup_tab = this.sanitizer.bypassSecurityTrustHtml(this.product_description['setup_tab']);
      this.user_guide_tab = this.sanitizer.bypassSecurityTrustHtml(this.product_description['user_guide_tab']);
      this.overview_tab = this.sanitizer.bypassSecurityTrustHtml(this.product_description['overview_tab']);
    })
  }

  paymentFunction() {
    const dynamicScripts = [
      'assets/tab.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  // get your currency 
  getcurrentCurrency() {
    this.paymentService.componentMethodCalledLogin$.subscribe((data) => {
      this.getProductsDetails();
    });
  }
}
