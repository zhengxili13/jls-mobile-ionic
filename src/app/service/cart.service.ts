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
    public storage:Storage,
    public utils: UtilsService,
    public toastCtrl: ToastController,
    public translate: TranslateService
  ) { 
    super();
    this.loadCart();
  }


  CalculAccount() {
    var totalAccount = 0;
    var selectedProduct = this.GetSelectedProduct();
    selectedProduct.forEach(p => {
      totalAccount = totalAccount + (p.Quantity * p.Price * p.QuantityPerBox);
    });
    return totalAccount;
  }

  checkProductListIsAvailable() {
    return this.cartProductList != null && this.cartProductList.length > 0;
  }


  checkSelectedProductListIsEmpty() {
    return this.GetSelectedProduct().length > 0
  }


  AllCheckBoxChange(checkAllProduct: boolean) {
    if (checkAllProduct == true) {
      this.cartProductList.forEach(p => {
        p.Selected = true;
      });
    }
    else {
      this.cartProductList.forEach(p => {
        p.Selected = false;
      });
    }
    this.SaveCart();
  }

  /* Remove a product in cart */
  removeItem(item: ICartProduct) {
    this.cartProductList = this.cartProductList.filter(p => p.ReferenceId != item.ReferenceId);
    this.SaveCart();
  }


  /* Add a product in cart */
  async addInCart(item: ICartProduct) {

    var cartProductList = this.cartProductList;
    if (cartProductList == null) {
      cartProductList = [];
    }
    var temp = cartProductList.find(p => p.ReferenceId == item.ReferenceId);
    if (temp == null) {
      if (item.Quantity == null) {
        item.Quantity = 0;
      }
      cartProductList.push(Object.assign({}, item));
    }
    cartProductList.forEach(p => {
      if (p.ReferenceId == item.ReferenceId) {
        p.Quantity = p.Quantity + 1;
      }
      if (p.Selected == null) {
        p.Selected = false;
      }
    });

    this.cartProductList = cartProductList;

    this.SaveCart();
    super.showToast(this.toastCtrl, this.translate.instant("Msg_AddInCart"));
  }

  GetSelectedProduct():ICartProduct[]  {
    if (this.cartProductList != null && this.cartProductList.length > 0) {
      return this.cartProductList.filter(p => {
        return p.Selected == true;
      });
    }
    else {
      return [];
    }
  }

  public RemoveProductInList(productList: ICartProduct[]){
    var newCartProductList = [];
    this.cartProductList.forEach(p => {
      if (productList.findIndex(x => x.ReferenceId == p.ReferenceId) == -1) {
        newCartProductList.push(p);
      }
    });
    this.cartProductList = newCartProductList;
    this.SaveCart();
  }

  public SaveCart() {
    this.storage.set('cartProductList', JSON.stringify(this.cartProductList));
  }

  private async loadCart(){
    if(JSON.parse(await this.utils.getKey('cartProductList'))!=null){
      this.cartProductList = JSON.parse(await this.utils.getKey('cartProductList'));
    }
    else{
      this.cartProductList = [];
    }
    this.adjustCartMinQuantity();
  }

  private adjustCartMinQuantity(){
    
    // Renew quantity check if quantiy < min quantity
    if (this.cartProductList != null && this.cartProductList.length > 0) {
      this.cartProductList.map(f => {
        if (f.Quantity < f.MinQuantity) {
          f.Quantity = f.MinQuantity;
        }
      });
    }
  }
  

}
