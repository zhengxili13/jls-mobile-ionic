import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Iproduct } from '../interface/iproduct';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(public http: HttpClient, public storage: Storage) { }

  public newMessageNumberSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public isLoginedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  async getKey(key: string): Promise<string> {
    return await this.storage.get(key).catch(()=>{return});
  }

  async checkIsLogined(): Promise<boolean> {

    var jwt = await this.getKey('jwt');
    var userId = await this.getKey('userId');
    return jwt != null && userId != null;
  }

  formatProductPromotionInfo(product: Iproduct){
    if(product.PreviousPrice!=null && product.PreviousPrice> product.Price){
      return {
        previousPrice : product.PreviousPrice,
        discountPerCent: -Math.ceil((1 - product.Price/product.PreviousPrice) * 100)
      };
    }
    else {
      return null;
    }
  }
}
