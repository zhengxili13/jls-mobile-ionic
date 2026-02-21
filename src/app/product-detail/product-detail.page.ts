import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BaseUI } from '../common/baseui';
import { UtilsService } from '../service/utils.service';
import { RestService } from '../service/rest.service';
import { Network } from '@awesome-cordova-plugins//network/ngx';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CartService } from '../service/cart.service';
import { ICartProduct } from '../interface/icart-product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage extends BaseUI {

  isFavorite: boolean = false;
  hasBought: boolean = false;
  productId: number;
  public logined: boolean = false;

  public product: any = {};
  public host = environment.SERVER_API_URL;

  constructor(public navCtrl: NavController,
    public translateService: TranslateService,
    public storage: Storage,
    public utils: UtilsService,
    public rest: RestService,
    public network: Network,
    public toastCtrl: ToastController,
    public router: ActivatedRoute,
    public cartService: CartService) {
    super();
  }

  ngOnInit() {

    console.log('ionViewDidLoad ProductDetailPage');
    this.productId = this.router.snapshot.queryParams["productId"];
    this.checkLogined();
    this.initLoadData();
  }

  addProductIntoFavoriteList() {
    if (this.logined) {
      this.isFavorite = !this.isFavorite;
      if (this.network.type != 'none') {

        this.rest.AddIntoProductFavoriteList({
          UserId: localStorage.getItem('userId'),
          ProductId: this.product.ProductId,
          IsFavorite: this.isFavorite
        }) //TODO: change
          .subscribe(
            (f: any) => {
              if (f != null && f > 0) {
                if (this.isFavorite == false) {
                  super.showToast(this.toastCtrl, this.translateService.instant("Msg_RemoveIntoFavoriteList"));
                }
                else {
                  super.showToast(this.toastCtrl, this.translateService.instant("Msg_AddFavoriteList"));
                }
              }
            },
            error => {
              super.showToast(this.toastCtrl, error.Msg);
            }
          );


      } else {
        super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
      }
    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_NotConnected"));
    }
  }

  writeEvaluation() {
    if (this.logined) {
      if (this.hasBought) {
        this.navCtrl.navigateForward('WriteProductEvaluationPage', {
          queryParams: {
            productId: this.productId
          }
        });
      }
      else {
        super.showToast(this.toastCtrl, this.translateService.instant("Msg_CantComment"));
      }
    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_NotConnected"));
    }
  }


  calculCommentAverageLevel() {
    var averageLevel = 5;
    if (this.product != null && this.product.Comments != null && this.product.Comments.length > 0) {
      var totalLevel = 0;
      this.product.Comments.forEach(p => {
        totalLevel = p.Level + totalLevel;
      });
      averageLevel = totalLevel / this.product.Comments.length;
    }
    return averageLevel;
  }

  initLoadData() {
    if (this.productId != null && this.productId != 0) {
      this.rest.GetProductById(this.productId).subscribe(result => {
        if (result != null) {
          console.log(result);
          this.product = result;
          this.isFavorite = result.IsFavorite;
          this.hasBought = result.HasBought;
        }
      },
        error => {

        })
    }
  }

  async checkLogined() {
    this.logined = await this.utils.checkIsLogined();
  }


  displayAvis() {
    if (this.product.Comments != null && this.product.Comments.length > 0) {
      this.navCtrl.navigateForward('ProductEvaluationListPage', {
        queryParams: {
          type: "GetCommentByProductId",
          productId: this.productId
        }
      });
    }
  }

  async addInCart(event: Event, item: ICartProduct) {
    event.stopPropagation();
    this.cartService.addInCart(item);
  }

}
