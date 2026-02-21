import { Component, OnInit } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { environment } from 'src/environments/environment';
import { NavController, ToastController } from '@ionic/angular';
import { UtilsService } from '../service/utils.service';
import { Storage } from '@ionic/storage';
import { Network } from '@awesome-cordova-plugins//network/ngx';
import { RestService } from '../service/rest.service';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage extends BaseUI {


  public logined: boolean = false;
  public checkAllProduct: boolean = false;
  public host = environment.SERVER_API_URL;

  constructor(
    public navCtrl: NavController,
    public utils: UtilsService,
    public storage: Storage,
    public network: Network,
    public rest: RestService,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public cartService: CartService
  ) {
    super();
  }

  ngOnInit() {
  }

  async checkLogined() {
    this.logined = await this.utils.checkIsLogined();
  }

  async ionViewDidEnter() {
    await this.checkLogined();
  }

  viewProductDetail(productId) {
    this.navCtrl.navigateForward('ProductDetailPage', {
      queryParams: {
        productId: productId
      }
    })
  }

  itemCheckBoxChange(item: any) {
    if (item.Selected == false) {
      this.checkAllProduct = false;
    }
    this.cartService.SaveCart();
  }

  checkQuantityWithMinQuantity(minQuantity, Quantity) {
    if (minQuantity != null && Quantity != null) {
      if (Quantity > minQuantity) {
        return Quantity;
      }
      else {
        return minQuantity;
      }
    }
    return 0;
  }

  onUpdate(data, minQuantity) {
    if (typeof data.number === 'number') {
      this.cartService.cartProductList.forEach(p => {
        if (p.ReferenceId == data.goods) {
          p.Quantity = data.number > minQuantity ? data.number : minQuantity;
        }
      });
      this.cartService.SaveCart();
    }
  }

  async valideCart() {
    if (this.logined) {
      /* Step1 : Get all the selected product */
      var selectedProduct = this.cartService.GetSelectedProduct();

      /* Step2: Get the real info for the product */
      var selectedReferenceIds = [];
      selectedProduct.map(p => selectedReferenceIds.push({ ReferenceId: p.ReferenceId, Quantity: p.Quantity }));
      this.navCtrl.navigateForward('OrderConfirmationPage', {
        queryParams: {
          References: JSON.stringify(selectedReferenceIds)
        }
      });
    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_NotConnected"));
    }
  }
}
