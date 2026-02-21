import { Component, OnInit } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { UtilsService } from '../service/utils.service';
import { RestService } from '../service/rest.service';
import { Network } from '@awesome-cordova-plugins//network/ngx';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from '../service/address.service';
import { Iaddress } from '../interface/iaddress';

@Component({
  selector: 'app-select-shipping-adress',
  templateUrl: './select-shipping-adress.page.html',
  styleUrls: ['./select-shipping-adress.page.scss'],
})
export class SelectShippingAdressPage extends BaseUI {


  selectedAdressId: number;
  adressList: Iaddress[] = [];
  previousPage: string;

  constructor(
    public navCtrl: NavController,
    public network: Network,
    public toastCtrl: ToastController,
    public rest: RestService,
    public utils: UtilsService,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public translateService: TranslateService,
    public router: ActivatedRoute,
    public addressService: AddressService
  ) {
    super();
    // todo place into ngOnInit
    this.addressService.selectedShipmentAdressBehaviour.subscribe(result => {
      if (result != null) {
        const index = this.adressList.findIndex(p => p.Id == result.Id);
        if (index >= 0) {
          this.adressList[index] = result;
        }
        else {
          this.adressList.push(result);
        }
      }
    });

    this.addressService.defaultShipmentAdressBehaviour.subscribe(result => {
      if (result != null) {
        this.selectedAdressId = result.Id;
      }
    })
  }

  async ngOnInit() {

    this.previousPage = this.router.snapshot.queryParams['CurrentPage'];

    if (this.network.type != 'none') {
      var loading = await super.showLoading(this.loadingCtrl, this.translateService.instant("Loading"));
      var userId = await this.utils.getKey('userId');
      this.rest.GetUserShippingAdress(userId) // 填写url的参数
        .subscribe(
          f => {
            if (f.Success && f.Data != null) {
              this.adressList = f.Data;
            } else {
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            }

            loading.dismiss();
          },
          error => {
            super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            loading.dismiss();
          });
    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
    }
  }


  addNewAddress() {
    this.navCtrl.navigateForward('AddAdressPage', {
      queryParams: {
        type: 'shippingAdress',
        currentPage: 'SelectShippingAdressPage',
        action: 'create'
      }
    });
  }

  modifyAdress(adress) {
    this.addressService.selectedShipmentAdressBehaviour.next(adress);
    this.navCtrl.navigateForward('AddAdressPage', {
      queryParams: {
        type: 'shippingAdress',
        action: 'update',
        currentPage: 'SelectShippingAdressPage'
      }
    });
  }

  saveShippingAdress() {
    let selectedShippingAdress = this.getSelectedAdress();
    // TODO add save shipping address in the database

    this.addressService.defaultShipmentAdressBehaviour.next(selectedShippingAdress);
    this.navCtrl.back();
  }

  ionViewWillLeave (){
    let selectedShippingAdress = this.getSelectedAdress();
    this.addressService.defaultShipmentAdressBehaviour.next(selectedShippingAdress);
  }

  getSelectedAdress() {
    if (this.adressList.length > 0) {
      let selectedAddress = this.adressList.find(p => p.Id == this.selectedAdressId);
      if (selectedAddress == null) {
        selectedAddress = this.adressList[0];
      }
      return selectedAddress;
    }
    else {
      return null;
    }

  }

}
