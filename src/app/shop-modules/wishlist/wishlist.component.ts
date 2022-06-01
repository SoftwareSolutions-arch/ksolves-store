import { Component, OnInit } from '@angular/core';
import { PaymentServicesService } from 'src/app/payment-checkout/payment-services.service';
import { ServicesService } from 'src/app/services.service';
import { ToasterPosition } from '../../positionClass';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { environment} from '../../../environments/environment.stagging'

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  myWishListItems: any = [];
  baseUrl: any = '';
  optionForm: any = FormGroup;
  isLoadingBool: boolean = true;
  environment: any = '';

  constructor(public meta:Meta,public formBuilder: FormBuilder,public title: Title, public router: Router, public service: ServicesService, private paymentService: PaymentServicesService,) {
    this.getWishlistItems();
    this.baseUrl = this.service.baseurl;
    this.environment=environment.front_end_url
    this.setupLoginFormData();
    this.meta.updateTag({ name: 'description', content: 'data' });
  }

  ngOnInit(): void {
    this.title.setTitle('Wishlist | Ksolves-store');
  }

  paymentFunction() {
    const dynamicScripts = [
      'assets/option.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  getWishlistItems() {
    this.service.getAllData('shop/wishlist').subscribe(res => {
      this.isLoadingBool = false;
      if (res.length == 0) {
        this.router.navigate(['/shop/empty-wishlist'])

      }
      else {
        this.myWishListItems = res;
      }
    })
  }

  detailPage(item: any) {
    this.router.navigate([`../${item.href}`])
    return false;
  }

  setupLoginFormData() {
    this.optionForm = this.formBuilder.group(
      {
        version: new FormControl("")
      }
    );
  }

  // add to cart
  addTocart(item: any) {
    this.isLoadingBool = true;
    var formData = new FormData();
    formData.append("product_id", item.id);
    this.service.post('shop/wishlist/move_to_cart/' + item.wish_id, formData).subscribe(result => {
      this.isLoadingBool = false;
      this.getWishlistItems();
      this.callMethod('');
    })
  }

  //delete product item method
  deleteProduct(item: any) {
    this.isLoadingBool = true;
    var formData = new FormData();
    formData.append("wish", item);

    this.service.post('shop/wishlist/remove', formData).subscribe(result => {
      this.isLoadingBool = false;
      this.getWishlistItems();
      this.callMethod('');
    })
  }

  changeVersion(item: any, event: any) {

    var formData = new FormData();
    formData.append("new_product_id", event.target.value);
    this.service.post('shop/wishlist/change-variant/' + item.wish_id, formData).subscribe(result => {
      this.service.success('', 'Version changed', ToasterPosition.bottomLeft);
      this.getWishlistItems();
    })
  }


  changeVersion2(item: any, items: any, event: any) {
    var formData = new FormData();
    formData.append("new_product_id", items);
    this.service.post('shop/wishlist/change-variant/' + item.wish_id, formData).subscribe(result => {
      this.service.success('', 'Version changed', ToasterPosition.bottomLeft);
      this.getWishlistItems();
    })
  }

  // update header data
  callMethod(count: any) {
    this.paymentService.callComponentMethod(count);
  };
}
