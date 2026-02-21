import { Component, OnInit } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../service/utils.service';
import { RestService } from '../service/rest.service';
import { environment } from 'src/environments/environment';
import { TranslationPage } from '../translation/translation.page';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CartService } from '../service/cart.service';
import { ICartProduct } from '../interface/icart-product';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends BaseUI {


  public host = environment.SERVER_API_URL;

  public screenWidth: number;
  public sldes: any[] = [];
  public logined: boolean = false;

  newProductList: any[] = [];
  hotProductList: any[] = [];
  promotionProduct: any[] = [];

  categoryList: any[];
  loadNumberOfProduct: number = 20;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public translate: TranslateService,
    public utils: UtilsService,
    public toastCtrl: ToastController,
    public platform: Platform,
    public rest: RestService,
    public storage: Storage,
    public cartService: CartService) {
    super();
  }

  ngOnInit() {
    // todo: place into right angular life cycle function
    this.rest.GetWbesiteslides(null).subscribe(result => {
      if (result != null && result.length > 0) {
        this.sldes = result;
      }
    });

    this.screenWidth = this.platform.width() * 0.4; // show 3 products 
    this.loadProductAnCategoryData();
  }



  async checkLogined() {

    this.logined = await this.utils.checkIsLogined();

    if (this.logined == true) {
      this.loadNotReadMessage();
    }
  }

  async ionViewWillEnter() {
    await this.checkLogined();
  }

  displaynewProductPage(viewAllProduct) {
    this.navCtrl.navigateForward('NewproductPage',
      {
        queryParams: {
          Title: (viewAllProduct != null && viewAllProduct) ? this.translate.instant("home.ViewAllProduct") : this.translate.instant("NewProduit"),
          PageType: (viewAllProduct != null && viewAllProduct) ? 'ViewAllProduct' : 'NewProduct'
        }

      });
  }

  displayByLowerSales() {
    this.navCtrl.navigateForward('NewproductPage',
      {
        queryParams: {
          Title: this.translate.instant("Promotionproduit"),
          PageType: 'LowerPriceProduct'
        }
      });
  }

  secondMenu(ReferenceId: number, RefereceLabel: string) {
    this.navCtrl.navigateForward('SubCategoryListPage', {
      queryParams: {
        ReferenceId: ReferenceId,
        RefereceLabel: RefereceLabel
      }
    });
  }

  loadProductAnCategoryData() {
    // Load new product 
    this.rest.GetProductListByPublishDate(0, this.loadNumberOfProduct) //TODO: change
      .subscribe(
        (f: any) => {
          if (f.Success) {

            this.newProductList = f["Data"].ProductListData;

          } else {
            super.showToast(this.toastCtrl, this.translate.instant("Msg_Error"));
          }
        },
        error => {
          super.showToast(this.toastCtrl, this.translate.instant("Msg_Error"));
        }
      );

    // Load product by sales perfomance
    // this.rest.GetProductListBySalesPerformance(0, this.loadNumberOfProduct) //TODO: change
    //   .subscribe(
    //     (f: any) => {
    //       if (f.Success) {

    //         this.hotProductList = f["Data"].ProductListData;

    //       } else {
    //         super.showToast(this.toastCtrl, this.translate.instant("Msg_Error"));
    //       }
    //     },
    //     error => {
    //       super.showToast(this.toastCtrl, this.translate.instant("Msg_Error"));
    //     }
    //   );

    this.rest.GetPromotionProduct(0, this.loadNumberOfProduct) //TODO: change
      .subscribe(
        (f: any) => {
          if (f.ProductList != null) {

            this.promotionProduct = f.ProductList;

          } else {
            super.showToast(this.toastCtrl, this.translate.instant("Msg_Error"));
          }
        },
        error => {
          super.showToast(this.toastCtrl, this.translate.instant("Msg_Error"));
        }
      );

    // Load category 
    this.rest.GetProductMainCategory() // 填写url的参数
      .subscribe(
        f => {
          if (f.Success && f.Data != null) {
            this.categoryList = f.Data;
          }
        });
  }

  loadNotReadMessage() {

    // this.rest.GetNoReadMessageCount({ UserId: localStorage.getItem('userId') }).subscribe(result => {
    //   if (result != null) {
    //     // TODO: Migration to rxjs subscriber 
    //     // this.event.publish('message:new', result);
    //     this.utils.newMessageNumberSubject.next(result);
    //   }
    // })
  }

  async addInCart(event: Event, item: ICartProduct) {
    event.stopPropagation();
    this.cartService.addInCart(item);
  }

  displayPromoProductPage() {
    this.navCtrl.navigateForward('/NewproductPage',
      {
        queryParams: {
          Title: this.translate.instant("home.Promotion"),
          PageType: 'PromoProduct'
        }
      });
  }

  myList() {
    if (this.logined) {
      this.navCtrl.navigateForward('/NewproductPage',
        {
          queryParams: {
            Title: this.translate.instant("Meslistes"),
            PageType: 'FavoriteList'
          }

        });
    }
    else {
      super.showToast(this.toastCtrl, this.translate.instant("Msg_NotConnected"));
    }

  }
  advancedSearch() {

    this.navCtrl.navigateForward('/NewproductPage',
      {
        queryParams: {
          Title: this.translate.instant("home.AdvancedSearch"),
          PageType: 'AdvancedProductSearch'
        }
      });
    //this.navCtrl.push('AdvancedSearchPage');
  }
  search() {
    this.navCtrl.navigateForward('/SearchPage');
  }

  contactUs() {
    this.navCtrl.navigateForward('/ContactUsPage');
  }

  displayCategoryListPage() {
    this.navCtrl.navigateForward("/CategoryListPage");
  }

  displayAvis() {
    this.navCtrl.navigateForward('/ProductEvaluationListPage');// show all
  }


  async translation() {
    // TODO: migration to lazy load modal 
    const modalTranslation = await this.modalCtrl.create({
      component: TranslationPage,
    });
    modalTranslation.present();

  }

  productDetail(product) {
    this.navCtrl.navigateForward('ProductDetailPage', {
      queryParams: {
        productId: product.ProductId
      }
    });
  }
}
