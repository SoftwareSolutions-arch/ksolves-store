import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-quotations-list-view',
  templateUrl: './quotations-list-view.component.html',
  styleUrls: ['./quotations-list-view.component.scss']
})
export class QuotationsListViewComponent implements OnInit {
  quatationsList: any = '';
  isLoadingBool: boolean = true;
  pagination: any = [];
  baseUrl:any='';
  url:any='';
  selectedIndex: any = 0;
  quatationsValue: any = '';

  constructor(public service: ServicesService,public title: Title,public router:Router,public sanitizer: DomSanitizer) {
    
    this.baseUrl = this.service.baseurl;
  }

  ngOnInit(): void {
    this.quatationsValue = localStorage.getItem('quatationsValue');
    if(this.quatationsValue==1){
      this.filterDataPage('');
    }
    else{
      this.getQuatationsList();
    }

    this.title.setTitle('Quatations-list | Ksolves-store');
    this.paymentFunction();
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

  getQuatationsList() {
    this.service.getAllData('my/quotes').subscribe(res => {
      this.quatationsList = res;
      this.pagination = res.pager;
      this.isLoadingBool = false;
    })
  }

  sortBy(data: any) {
    this.isLoadingBool=true;
    this.service.get5('my/quotes?sortby=' + data,).subscribe(res => {
      this.quatationsList = res;
      this.isLoadingBool=false;      
    })
  }

  filterDataPage(item: any) {
    if(item){
      this.isLoadingBool=true;
      this.selectedIndex = item.num-1;
      let str = item.url;
      str = str.substring(1);
      localStorage.setItem('Quatations_page_number',this.selectedIndex)
      localStorage.setItem('Quatations_link',str)

      this.service.get3(str).subscribe(res => {
        this.isLoadingBool=false;
        this.quatationsList = res;
        this.pagination = res.pager;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      })
    }

    else{
      this.isLoadingBool=true;
      this.selectedIndex = Number(localStorage.getItem('Quatations_page_number'));
      var str = localStorage.getItem('Quatations_link');
      this.service.get3(str).subscribe(res => {
        this.isLoadingBool=false;
        this.quatationsList = res;
        this.pagination = res.pager;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      })
    }
  
  }

  previousPage() {
    this.isLoadingBool=true;
    this.selectedIndex = this.pagination.page_previous.num-1;
    let str = this.pagination.page_previous.url;
    str = str.substring(1);
    this.service.get3(str).subscribe(res => {
      this.isLoadingBool=false;
      this.quatationsList = res;
      this.pagination = res.pager;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
  }

  nextPage() {
    this.isLoadingBool=true;
    this.selectedIndex = this.pagination.page_next.num-1;
    let str = this.pagination.page_next.url;
    str = str.substring(1);
    this.service.get3(str).subscribe(res => {
      this.isLoadingBool=false;
      this.quatationsList = res;
      this.pagination = res.pager;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
  }
  
  quotationFormView(items: any) {
    localStorage.setItem('quatationsValue','1');
    let str = items.href;
    str = str.substring(1);
    this.router.navigateByUrl(str);
  }
}
