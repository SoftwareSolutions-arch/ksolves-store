import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentServicesService {
  constructor() { }

  // Observable string sources
  private componentMethodCallSource = new Subject<any>();
  private componentMethodCallSourceLogin = new Subject<any>();
  private componentMethodCallSourceChanged = new Subject<any>();
  private componentMethodCallSourcetemp= new Subject<any>();
  private componentMethodCallSourcemain= new Subject<any>();

  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  componentMethodCalledLogin$ = this.componentMethodCallSourceLogin.asObservable();

  componentMethodCalledChanged$ = this.componentMethodCallSourceChanged.asObservable();

  componentMethodCalledChangedTemp$ = this.componentMethodCallSourcetemp.asObservable();

  componentMethodCalledChangedMain$ = this.componentMethodCallSourcemain.asObservable();


  // Service message commands
  callComponentMethod(count: number) {
    this.componentMethodCallSource.next({ count: count });
  }

  // Service message commands
  tempData(count: any) {
    this.componentMethodCallSourcetemp.next({ count: count });
  }

  // Service message commands
  callComponentMethodLogin() {
    this.componentMethodCallSourceLogin.next();
  }

  // Service message commands
  callComponentMethodChanged() {
    this.componentMethodCallSourceChanged.next();
  }


  callMainPage(){
    this.componentMethodCallSourcemain.next();
  }

}
