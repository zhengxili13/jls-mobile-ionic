import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilsService } from '../service/utils.service';
import { Storage } from '@ionic/storage';
import { NavController, ToastController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Network } from '@awesome-cordova-plugins//network/ngx';
import { RestService } from '../service/rest.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseUI } from '../common/baseui';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { OrderConfirmationSucceessPage } from '../order-confirmation-succeess/order-confirmation-succeess.page';
import { AddressService } from '../service/address.service';
import { Iaddress } from '../interface/iaddress';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage extends BaseUI {
  public host = environment.SERVER_API_URL;

  public TaxRate: number = 0;
  public ShippingMessage: string = "France de port 1500€HT, 2000€HT pour le sud de la France et 2500€HT pour les étangers.";
  orderProductList: any[] = [];
  facturationAdress: Iaddress;
  defaultShippingAdress: Iaddress;

  public SavedOrder: boolean = false;

  public remark: string = "";
  entrepriseName: string;

  public setSameAddress: boolean = false;

  constructor(
    public navCtrl: NavController,
    public utils: UtilsService,
    public storage: Storage,
    public network: Network,
    public rest: RestService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public translateService: TranslateService,
    public router: ActivatedRoute,
    public addressService: AddressService,
    public cartService: CartService
  ) {
    super();

    // Todo place into ngInit, capture the change of the address
    this.addressService.facturationAddressBehaviour.subscribe(result => this.facturationAdress = result);
    this.addressService.defaultShipmentAdressBehaviour.subscribe(result => this.defaultShippingAdress = result);
  }


  async ionViewDidEnter() {
    if (this.router.snapshot.queryParams['tempSelectedAdress'] != null) {
      this.defaultShippingAdress = JSON.parse(this.router.snapshot.queryParams['tempSelectedAdress']);
    }
  }


  /* Leave current page: confimation */
  async dismiss() {
    var shouldLeave;
    if (!this.SavedOrder) {
      shouldLeave = await this.confirmLeave();
    }
    if (shouldLeave || this.SavedOrder) {
      
      //this.navCtrl.back();

      this.navCtrl.navigateBack('/tabs/tabCart');
    }
  }

  async confirmLeave(): Promise<Boolean> {
    let resolveLeaving;
    const canLeave = new Promise<Boolean>(resolve => resolveLeaving = resolve);
    const alert = await this.alertCtrl.create({
      header: this.translateService.instant('Leave'),
      message: this.translateService.instant('Msg_ConfirmLeave'),
      buttons: [
        {
          text: this.translateService.instant('No'),
          role: 'cancel',
          handler: () => resolveLeaving(false)
        },
        {
          text: this.translateService.instant('Yes'),
          handler: () => resolveLeaving(true)
        }
      ],
    });
    alert.present();
    return canLeave
  }


  async ngOnInit() {
    if (this.network.type != 'none') {
      var loading = await super.showLoading(this.loadingCtrl, this.translateService.instant("Loading"));
      var UserId = localStorage.getItem('userId'); //await this.utils.getKey('userId');

      // Get selected product in cart  
      var selectedReferenceIds = [];
      var selectedReferencesStringfy = this.router.snapshot.queryParams['References']
      var selectedReferences = selectedReferencesStringfy != null ? JSON.parse(selectedReferencesStringfy) : [];

      selectedReferences.map(p => selectedReferenceIds.push(p.ReferenceId));

      forkJoin(this.rest.GetReferenceItemsByCategoryLabels({ ShortLabels: ['InAppMessage', 'TaxRate'] }), this.rest.GetProductInfoByReferenceIds(selectedReferenceIds),
        this.rest.GetUserFacturationAdress(UserId), this.rest.GetUserDefaultShippingAdress(UserId), this.rest.GetUserById(localStorage.getItem('userId')))
        .subscribe(
          ([ReferenceList, SelectedProductInfo, FacturationAdress, ShippingAdress, CustomerInfo]) => {
            if (SelectedProductInfo != null && SelectedProductInfo.length > 0 &&
              FacturationAdress.Success && ShippingAdress.Success) {
              /* Bind the product data */
              this.formatProductData(SelectedProductInfo, selectedReferences);

              /* Bind the facturation adress data */
              this.addressService.facturationAddressBehaviour.next(FacturationAdress.Data);

              /* Bind the shipping adress data */
              if (ShippingAdress.Data != null) {
                this.addressService.defaultShipmentAdressBehaviour.next(ShippingAdress.Data);
              }


              if (CustomerInfo != null && CustomerInfo.EntrepriseName != null) {
                this.entrepriseName = CustomerInfo.EntrepriseName;
              }
            }

            if (ReferenceList != null && ReferenceList.length > 0) {
              // Format shippingMessage and Tax rate 
              ReferenceList.map(p => {
                if (p.Code == "ShippingMessage") {
                  this.ShippingMessage = p.Label;
                }
                else if (p.ReferenceCategoryLabel == "TaxRate") {
                  this.TaxRate = p.Value;
                }
              });
            }
          },
          error => {
            loading.dismiss();
            this.navCtrl.pop();
            super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
          },
          () => loading.dismiss());

    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
    }
  }

  modifyFacturationAdress() {
    this.navCtrl.navigateForward('AddAdressPage', {
      queryParams: {
        type: 'facturationAdress',
        currentPage: 'OrderConfirmationPage'
      }
    });
  }


  formatProductData(SelectedProductInfo, selectedReferences) {

    /* Bind the data */
    this.orderProductList = SelectedProductInfo;
    /* Attach the quantity */
    this.orderProductList.map(p => {
      var temp = selectedReferences.find(x => { return x.ReferenceId == p.ReferenceId; });
      if (temp != null) {
        p.Quantity = temp.Quantity;
      }
    });
    console.log(this.orderProductList);
  }

  calculTotalPrice() {
    var total = 0;
    this.orderProductList.map(p => total = total + p.Price * p.Quantity * p.QuantityPerBox);
    return total;
  }

  selectShippingAdress() {
    this.navCtrl.navigateForward('SelectShippingAdressPage',
      {
        queryParams: {
          CurrentPage: 'OrderConfirmationPage'
        }
      });
  }


  async validOrder() {
    var productInfo = [];
    this.orderProductList.map(p => productInfo.push({
      ReferenceId: p.ReferenceId,
      Quantity: p.Quantity,
      UnityQuantity: p.QuantityPerBox
    }));
    var shippingAdressId;
    if (this.defaultShippingAdress != null && this.defaultShippingAdress["Id"] != null) {
      shippingAdressId = this.defaultShippingAdress["Id"];
    }
    if (shippingAdressId == null) {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_SelectShippingAddress"));
      return;
    }

    var facturationAdressId = this.facturationAdress["Id"];

    // Set facturation address as shipping address when checkbox is selected
    if(this.setSameAddress&& shippingAdressId!=null){
      facturationAdressId = shippingAdressId;
    }

    var UserId = Number.parseInt(await this.utils.getKey('userId'));
    if (productInfo.length > 0 && shippingAdressId != null) {
      if (this.network.type != 'none') {
        var loading = await super.showLoading(this.loadingCtrl, this.translateService.instant("Loading"));
        this.rest.SaveOrder(productInfo, shippingAdressId, facturationAdressId, UserId, this.remark) // 填写url的参数
          .subscribe(
            async f => {
              if (f.Success && f.Data != null) {
                /*Step1: Show the successful message */
                super.showToast(this.toastCtrl, this.translateService.instant("Msg_OrdePassedSuccess"));

                /*Step2: Remove the already pass product */
                this.cartService.RemoveProductInList(productInfo);
                this.SavedOrder = true;
                //this.navCtrl.setRoot('OrderConfirmationSucceessPage',{OrderId: f.Data});
                // this.navCtrl.pop();
                let modal = await this.modalCtrl.create({
                  component: OrderConfirmationSucceessPage,
                  componentProps: {
                    Email: f.DataExt != null ? f.DataExt : '',
                    OrderId: f.Data
                  }
                });

                modal.present();

                // add message number 
                var NewMessageNumber = this.utils.newMessageNumberSubject.value + 1; // When order place successfully, a new message should be sent
                this.utils.newMessageNumberSubject.next(NewMessageNumber);
              } else {
                super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
              }
            },
            error => {
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            },
            () => {
              loading.dismiss();
            });
      }
      else {
        super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
      }
    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
    }

  }

}
