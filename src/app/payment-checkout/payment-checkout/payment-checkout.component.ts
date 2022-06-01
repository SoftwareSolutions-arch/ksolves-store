import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services.service'
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ToasterPosition } from 'src/app/positionClass';
import { DomSanitizer } from '@angular/platform-browser';
import { PaymentServicesService } from '../payment-services.service';
import { environment} from '../../../environments/environment.stagging'

@Component({
  selector: 'app-payment-checkout',
  templateUrl: './payment-checkout.component.html',
  styleUrls: ['./payment-checkout.component.scss']
})
export class PaymentCheckoutComponent implements OnInit {
  isShow: boolean = true;
  isLoadingBool: boolean = true;
  isShowMore: boolean = false;
  isShowMore_second: boolean = false;
  hidestatelist: boolean = true;
  formShow: boolean = false;
  baseUrl: any = '';
  itemsVal = 1;
  addressForm: any = FormGroup;
  error_messages: any = '';
  webResponse: any = '';
  authToken: any = '';
  allCountryList: any = '';
  allStateList: any = '';
  editAddressData: any = '';
  subtotal = 0;
  Allproducts: any = [];
  website_cart_summary: any = [];
  myAddress: any = '';
  csrf_token: any;
  payment_acquirers: any = '';
  paymentData: any = '';
  promo_code: any = '';
  total_amount: any = '';
  giftCouponStatus: any = '';
  confirm_order_url: any = '';
  myname: any = '';
  environment: any = '';

  constructor(public formBuilder: FormBuilder, private paymentService: PaymentServicesService, private sanitizer: DomSanitizer, public service: ServicesService, public router: Router) {
    this.baseUrl = this.service.baseurl;
    // localStorage.setItem('methodName', '1')
    this.setupaddressFormData();
    this.getProductsDetails();
    this.environment=environment.front_end_url

  }

  setupaddressFormData() {
    this.error_messages = {
      email: [
        { type: "required", message: '*Required' },
        { type: "pattern", message: '*Please enter valid email' }
      ],
      name: [
        { type: "required", message: '*Required' }
      ],
      phone: [
        { type: "required", message: '*Required' }
      ],
      street_number: [
        { type: "required", message: '*Required' }
      ],
      street2: [
        { type: "required", message: '*Required' }
      ],
      city: [
        { type: "required", message: '*Required' }
      ],
      zipcode: [
        { type: "required", message: '*Required' }
      ],
      country: [
        { type: "required", message: '*Required' }
      ],

    };
    this.addressForm = this.formBuilder.group(
      {
        email: new FormControl("",
          Validators.compose([Validators.required,
          Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
          ])
        )
      }
    );
  }

  ngOnInit(): void {
    this.getcurrentCurrency();
  }

  showMore() {
    this.isShowMore = !this.isShowMore
  }
  showMoreSecond() {
    this.isShowMore_second = !this.isShowMore_second
  }

  getProductsDetails() {
    this.isLoadingBool = true;
    this.service.getAllData('shop/payment').subscribe(res => {
      this.confirm_order_url = res.confirm_order_url;
      this.Allproducts = res.website_order_line;
      this.website_cart_summary = res.website_cart_summary;
      this.total_amount = res.website_cart_summary.Total_amnt;
      this.myAddress = res.Address.email;
      this.addressForm.controls.email.setValue(this.myAddress);

      if (this.myAddress != '') {
        // this.addressForm.controls.email.disable();
        this.addressForm.controls.email.setValue(res.Address.email);
      }
      this.csrf_token = res.Address.csrf_token;
      this.payment_acquirers = res.payment_acquirers;
      this.myname = this.payment_acquirers[0].name;
      this.paymentData = this.payment_acquirers[0].id;

      if (this.payment_acquirers[0].provider == "stripe") {
        localStorage.setItem('methodName', '2')
      }
      if (this.payment_acquirers[0].provider == "paypal") {
        localStorage.setItem('methodName', '1')
      }
      this.Allproducts.forEach((element: any) => {
        this.subtotal += element.price_reduce_taxexcl;
      })
      this.isLoadingBool = false;
    })
  }

  back() {
    this.addressForm.enable();
    this.isShow = true;
  }

  next() {

    this.addressForm.disable();
    var formData = new FormData();
    if (this.hidestatelist != true) {
      formData.append("state_id", this.addressForm.value.state);
    }
    if (this.hidestatelist == true) {
      formData.append("state_id", '');
    }
    formData.append("name", this.addressForm.value.name);
    formData.append("email", this.addressForm.value.email);
    formData.append("phone", this.addressForm.value.phone);
    formData.append("street", this.addressForm.value.street_number);
    formData.append("street2", this.addressForm.value.street2);
    formData.append("city", this.addressForm.value.city);
    formData.append("zip", this.addressForm.value.zipcode);
    formData.append("country_id", this.addressForm.value.country);
    formData.append("csrf_token", this.editAddressData.csrf_token);
    formData.append("partner_id", this.editAddressData.partner_id);
    formData.append("submitted", '1');
    formData.append("callback", this.editAddressData.callback);
    formData.append("field_required", "phone,name");
    this.isLoadingBool = true;
    this.service.post('shop/address', formData).subscribe(result => {
      this.isLoadingBool = false;
      if (result.status == 200) {
        this.getProductsDetails();
        this.addressForm.enable();
        this.isShow = true;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Address updated',
          showConfirmButton: false,
          timer: 1000
        })
      }
      else {
        this.service.success('', result.statusText, ToasterPosition.bottomLeft);
      }
    })
  }

  getState() {
    this.isLoadingBool = true;
    var formData = new FormData();
    formData.append("csrf_token", this.csrf_token);
    this.service.post('custom/shop/country_infos/' + this.addressForm.value.country, formData).subscribe(result => {
      this.isLoadingBool = false;
      this.allStateList = result.body.states;
      if (this.allStateList.length == 0) {
        this.hidestatelist = true;
      } else {
        this.hidestatelist = false;
      }
    })
  }

  edit() {
    this.isShow = false;
    var formData = new FormData();
    formData.append("csrf_token", this.myAddress.csrf_token);
    formData.append("partner_id", this.myAddress.partner_id);
    this.isLoadingBool = true;
    this.allStateList = [];
    this.editAddressData = [];
    this.service.post('shop/address', formData).subscribe(result => {
      this.isLoadingBool = false;
      this.editAddressData = result.body;
      this.allStateList = this.editAddressData.states;
      this.addressForm.controls.name.setValue(this.editAddressData.name);
      this.addressForm.controls.email.setValue(this.editAddressData.email);
      this.addressForm.controls.phone.setValue(this.editAddressData.phone);
      this.addressForm.controls.street_number.setValue(this.editAddressData.street);
      this.addressForm.controls.street2.setValue(this.editAddressData.street2);
      this.addressForm.controls.city.setValue(this.editAddressData.city);
      this.addressForm.controls.zipcode.setValue(this.editAddressData.zip);
      this.addressForm.controls.country.setValue(this.editAddressData.country_id);
      this.addressForm.controls.state.setValue(this.editAddressData.state_id);
      if (this.editAddressData.state_id != null) {
        this.hidestatelist = false
      }
      else {
        this.hidestatelist = true
      }
    })
  }

  incrementItem(items: any) {
    console.log('items',items)
    if (items.product_name == "Discount Coupon") {
      return
    }

    this.isLoadingBool = true;
    var value: any;
    value = items.product_qty + 1;
    var formData = new FormData();
    formData.append("product_id", items.product_id);
    formData.append("set_qty", value);
    formData.append("line_id", items.line_id);

    this.service.post('custom/shop/cart/update_json', formData).subscribe(result => {
      this.callMethod('');
      this.Allproducts = result.body.website_order_line;
      this.website_cart_summary = result.body.website_cart_summary;
      this.isLoadingBool = false;
    })
  }

  decrementItems(item: any) {
    if (item.product_name == "Discount Coupon") {
      return
    }
    this.isLoadingBool = true;
    if (--item.product_qty <= 0) {
      this.deleteProduct(item);
    }
    else {
      var value: any;
      value = item.product_qty;
      var formData = new FormData();
      formData.append("product_id", item.product_id);
      formData.append("set_qty", value);
      formData.append("line_id", item.line_id);
      this.service.post('custom/shop/cart/update_json', formData).subscribe(result => {
        this.Allproducts = result.body.website_order_line;
        this.website_cart_summary = result.body.website_cart_summary;
        this.total_amount = result.body.website_cart_summary.Total_amnt;

        this.callMethod(value);
        this.isLoadingBool = false;
      })
    }
  }

  detsilPage(item: any) {
    if (item.product_name == "Discount Coupon") {
      return
    }
    let urld = item.href.split('/')[3];
    var data = item.href.split('/')[2];
    this.router.navigate([`../shop/${data}/${urld}`])
    return false;
  }

  deleteItems(item: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        var formData = new FormData();
        formData.append("product_id", item.product_id);
        formData.append("line_id", item.line_id);
        this.service.post('custom/shop/cart/update_json', formData).subscribe(result => {
          if (item.product_name == "Discount Coupon") {
            this.giftCouponStatus = '';
            this.promo_code = ''
          }
          this.callMethod('');
          this.Allproducts = result.body.website_order_line;
          this.website_cart_summary = result.body.website_cart_summary;
          this.total_amount = result.body.website_cart_summary.Total_amnt;
          this.service.success('', 'Item has been deleted', ToasterPosition.bottomLeft);
          if (result.body.website_order_line.length == 0) {
            this.router.navigate(['shop/cart'])
          }
        })
      } 
    })
  }

  //delete product item method
  deleteProduct(item: any) {
    var formData = new FormData();
    formData.append("product_id", item.product_id);
    formData.append("line_id", item.line_id);

    this.service.post('custom/shop/cart/update_json', formData).subscribe(result => {
      this.callMethod('');
      this.isLoadingBool = false;
      this.total_amount = result.body.website_cart_summary.Total_amnt;
      this.Allproducts = result.body.website_order_line;
      this.website_cart_summary = result.body.website_cart_summary;
      if (result.body.website_order_line.length == 0) {
        this.router.navigate(['shop/cart'])
      }
    })
  }

  userInputData(event: any) {
    this.paymentData = event.id;
    if (event.provider == "paypal") {
      localStorage.setItem('methodName', '1')
    }
    if (event.provider == "stripe") {
      localStorage.setItem('methodName', '2');
    }
  }

  onSubmit() {
    if (this.addressForm.value.email == '') {
      this.service.error('Error', 'please enter your mail first', ToasterPosition.topCenter)
      return
    }

    this.isLoadingBool = true;
    // paypal
    if (localStorage.getItem('methodName') == '1') {
      var formData = new FormData();
      formData.append("csrf_token", this.csrf_token);
      formData.append("acquirer_id", this.paymentData);
      formData.append('email', this.addressForm.value.email)
      this.service.post('shop/payment/transaction/', formData).subscribe(result => {
        this.isLoadingBool = false;
        localStorage.setItem('paymentPage', result.body);
        this.router.navigate(['/payment-confirmation/payment-processing']);
      })
    }

    // stripe
    else {
      this.formShow = true;
      var formData = new FormData();
      formData.append("csrf_token", this.csrf_token);
      formData.append("acquirer_id", this.paymentData);
      formData.append('email', this.addressForm.value.email)

      this.service.post('shop/payment/transaction/', formData).subscribe(result => {
        this.isLoadingBool = false;
        var data = "<div>" + result.body + "</div>";
        let session_id: any = $(data).find('input[name="session_id"]').val();
        let stripe_key: any = $(data).find('input[name="stripe_key"]').val();
        localStorage.setItem('payment_session_id', session_id);
        localStorage.setItem('stripe_session_id', stripe_key);
        this.paymentFunction();
      })
    }
  }

  paymentFunction() {
    const dynamicScripts = [
      'assets/payment.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  // update header data
  callMethod(count: any) {
    this.paymentService.callComponentMethod(count);
  };

  applyPromoCode() {
    this.isLoadingBool = true;
    var formData = new FormData();
    formData.append("promo_voucher", this.promo_code);
    this.service.post('shop/gift_coupon', formData).subscribe(result => {
      this.giftCouponStatus = result.body;
      this.callMethod('');
      this.isLoadingBool = false;
      this.getProductsDetails();
    })
  }

  getcurrentCurrency() {
    this.paymentService.componentMethodCalledLogin$.subscribe((data) => {
      this.getProductsDetails();
    });
  }

  confirmOrder() {
    this.router.navigateByUrl(this.confirm_order_url);
  }
}
