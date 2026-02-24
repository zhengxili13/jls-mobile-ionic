import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Iproduct } from '../interface/iproduct';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private storage: Storage) { }

  public newMessageNumberSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public isLoginedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  async getKey(key: string): Promise<string> {
    return await this.storage.get(key).catch(() => { return; });
  }

  async checkIsLogined(): Promise<boolean> {
    const jwt = await this.getKey('jwt');
    const userId = await this.getKey('userId');
    return jwt != null && userId != null;
  }

  formatProductPromotionInfo(product: Iproduct) {
    if (product.PreviousPrice != null && product.PreviousPrice > product.Price) {
      return {
        previousPrice: product.PreviousPrice,
        discountPerCent: -Math.ceil((1 - product.Price / product.PreviousPrice) * 100)
      };
    }
    return null;
  }
}
