import { Component, OnInit } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../service/utils.service';
import { RestService } from '../service/rest.service';
import { environment } from 'src/environments/environment';
import { TranslationPage } from '../translation/translation.page';
import { Platform } from '@ionic/angular';
import { CartService } from '../service/cart.service';
import { ICartProduct } from '../interface/icart-product';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends BaseUI implements OnInit {

  public readonly host = environment.SERVER_API_URL;

  public screenWidth: number;
  public slides: any[] = [];
  public logined = false;

  newProductList: any[] = [];
  hotProductList: any[] = [];
  promotionProduct: any[] = [];
  categoryList: any[];

  private readonly loadNumberOfProduct = 20;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    public utils: UtilsService,
    private toastCtrl: ToastController,
    private platform: Platform,
    private rest: RestService,
    private cartService: CartService
  ) {
    super();
  }

  ngOnInit() {
    this.rest.GetWbesiteslides(null).subscribe(result => {
      if (result != null && result.length > 0) {
        this.slides = result;
      }
    });

    this.screenWidth = this.platform.width() * 0.4;
    this.loadProductAndCategoryData();
  }

  async ionViewWillEnter() {
    this.logined = await this.utils.checkIsLogined();
  }

  displaynewProductPage(viewAllProduct: boolean) {
    const isViewAll = viewAllProduct != null && viewAllProduct;
    this.navCtrl.navigateForward('NewproductPage', {
      queryParams: {
        Title: isViewAll ? this.translate.instant('home.ViewAllProduct') : this.translate.instant('NewProduit'),
        PageType: isViewAll ? 'ViewAllProduct' : 'NewProduct'
      }
    });
  }

  displayByLowerSales() {
    this.navCtrl.navigateForward('NewproductPage', {
      queryParams: {
        Title: this.translate.instant('Promotionproduit'),
        PageType: 'LowerPriceProduct'
      }
    });
  }

  secondMenu(ReferenceId: number, RefereceLabel: string) {
    this.navCtrl.navigateForward('SubCategoryListPage', {
      queryParams: { ReferenceId, RefereceLabel }
    });
  }

  loadProductAndCategoryData() {
    this.rest.GetProductListByPublishDate(0, this.loadNumberOfProduct)
      .subscribe(
        (f: any) => {
          if (f.Success) {
            this.newProductList = f['Data'].ProductListData;
          } else {
            super.showToast(this.toastCtrl, this.translate.instant('Msg_Error'));
          }
        },
        () => super.showToast(this.toastCtrl, this.translate.instant('Msg_Error'))
      );

    this.rest.GetPromotionProduct(0, this.loadNumberOfProduct)
      .subscribe(
        (f: any) => {
          if (f.ProductList != null) {
            this.promotionProduct = f.ProductList;
          } else {
            super.showToast(this.toastCtrl, this.translate.instant('Msg_Error'));
          }
        },
        () => super.showToast(this.toastCtrl, this.translate.instant('Msg_Error'))
      );

    this.rest.GetProductMainCategory()
      .subscribe(f => {
        if (f.Success && f.Data != null) {
          this.categoryList = f.Data;
        }
      });
  }

  addInCart(event: Event, item: ICartProduct) {
    event.stopPropagation();
    this.cartService.addInCart(item);
  }

  displayPromoProductPage() {
    this.navCtrl.navigateForward('/NewproductPage', {
      queryParams: {
        Title: this.translate.instant('home.Promotion'),
        PageType: 'PromoProduct'
      }
    });
  }

  myList() {
    if (this.logined) {
      this.navCtrl.navigateForward('/NewproductPage', {
        queryParams: {
          Title: this.translate.instant('Meslistes'),
          PageType: 'FavoriteList'
        }
      });
    } else {
      super.showToast(this.toastCtrl, this.translate.instant('Msg_NotConnected'));
    }
  }

  advancedSearch() {
    this.navCtrl.navigateForward('/NewproductPage', {
      queryParams: {
        Title: this.translate.instant('home.AdvancedSearch'),
        PageType: 'AdvancedProductSearch'
      }
    });
  }

  search() {
    this.navCtrl.navigateForward('/SearchPage');
  }

  contactUs() {
    this.navCtrl.navigateForward('/ContactUsPage');
  }

  displayCategoryListPage() {
    this.navCtrl.navigateForward('/CategoryListPage');
  }

  displayAvis() {
    this.navCtrl.navigateForward('/ProductEvaluationListPage');
  }

  async translation() {
    const modalTranslation = await this.modalCtrl.create({
      component: TranslationPage,
    });
    modalTranslation.present();
  }

  productDetail(product: any) {
    this.navCtrl.navigateForward('ProductDetailPage', {
      queryParams: { productId: product.ProductId }
    });
  }
}
