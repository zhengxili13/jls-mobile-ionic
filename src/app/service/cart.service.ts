import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { BaseUI } from '../common/baseui';
import { ICartProduct } from '../interface/icart-product';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseUI {

  cartProductList: ICartProduct[];

  constructor(
    private storage: Storage,
    private utils: UtilsService,
    private toastCtrl: ToastController,
    private translate: TranslateService
  ) {
    super();
    this.loadCart();
  }

  CalculAccount(): number {
    let total = 0;
    this.GetSelectedProduct().forEach(p => {
      total += p.Quantity * p.Price * p.QuantityPerBox;
    });
    return total;
  }

  checkProductListIsAvailable(): boolean {
    return this.cartProductList != null && this.cartProductList.length > 0;
  }

  checkSelectedProductListIsEmpty(): boolean {
    return this.GetSelectedProduct().length > 0;
  }

  AllCheckBoxChange(checkAllProduct: boolean) {
    this.cartProductList.forEach(p => {
      p.Selected = checkAllProduct;
    });
    this.SaveCart();
  }

  /** Remove a product from cart */
  removeItem(item: ICartProduct) {
    this.cartProductList = this.cartProductList.filter(p => p.ReferenceId !== item.ReferenceId);
    this.SaveCart();
  }

  /** Add a product to cart */
  async addInCart(item: ICartProduct) {
    this.cartProductList = this.cartProductList ?? [];

    const existing = this.cartProductList.find(p => p.ReferenceId === item.ReferenceId);
    if (existing == null) {
      const newItem = Object.assign({}, item);
      newItem.Quantity = newItem.Quantity ?? 0;
      newItem.Selected = false;
      this.cartProductList.push(newItem);
    }

    this.cartProductList.forEach(p => {
      if (p.ReferenceId === item.ReferenceId) {
        p.Quantity += 1;
      }
    });

    this.SaveCart();
    super.showToast(this.toastCtrl, this.translate.instant('Msg_AddInCart'));
  }

  GetSelectedProduct(): ICartProduct[] {
    if (this.cartProductList != null && this.cartProductList.length > 0) {
      return this.cartProductList.filter(p => p.Selected === true);
    }
    return [];
  }

  public RemoveProductInList(productList: ICartProduct[]) {
    this.cartProductList = this.cartProductList.filter(
      p => productList.findIndex(x => x.ReferenceId === p.ReferenceId) === -1
    );
    this.SaveCart();
  }

  public SaveCart() {
    this.storage.set('cartProductList', JSON.stringify(this.cartProductList));
  }

  private async loadCart() {
    // Single async IO call (was called twice before)
    const raw = await this.utils.getKey('cartProductList');
    this.cartProductList = JSON.parse(raw) ?? [];
    this.adjustCartMinQuantity();
  }

  private adjustCartMinQuantity() {
    if (this.cartProductList != null && this.cartProductList.length > 0) {
      this.cartProductList.forEach(f => {
        if (f.Quantity < f.MinQuantity) {
          f.Quantity = f.MinQuantity;
        }
      });
    }
  }
}
