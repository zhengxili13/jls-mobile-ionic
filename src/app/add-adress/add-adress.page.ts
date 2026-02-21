import { Component, OnInit } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@awesome-cordova-plugins//network/ngx';
import { RestService } from '../service/rest.service';
import { UtilsService } from '../service/utils.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from '../service/address.service';

@Component({
  selector: 'app-add-adress',
  templateUrl: './add-adress.page.html',
  styleUrls: ['./add-adress.page.scss'],
})
export class AddAdressPage extends BaseUI {
  adreeForm: FormGroup;
  type: string;
  previousPage: string;

  constructor(
    public navCtrl: NavController,
    public translateService: TranslateService,
    public network: Network,
    public formBuilder: FormBuilder,
    public rest: RestService,
    public toastCtrl: ToastController,
    public utils: UtilsService,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public router: ActivatedRoute,
    public addressService: AddressService
  ) {
    super();

    this.adreeForm = this.formBuilder.group({
      Id: ['0'],
      EntrepriseName: ['', Validators.required],
      // ContactFirstName: ['', Validators.required],
      // ContactLastName: ['', Validators.required],
      FirstLineAddress: ['', Validators.required],
      SecondLineAddress: [''],
      City: ['', Validators.required],
      Country: ['', Validators.required],
      ZipCode: ['', Validators.required],
      ContactTelephone: ['', Validators.required],
      ContactFax: ['']
    });
  }

  ngOnInit() {
    this.previousPage = this.router.snapshot.queryParams['currentPage'];
    this.type = this.router.snapshot.queryParams['type'];

    if (this.type == "facturationAdress") {
      this.adreeForm.patchValue(this.addressService.facturationAddressBehaviour.value);
    }
    else if (this.type = "shippingAdress") {
      // create a new address or update existant address 
      if (this.router.snapshot.queryParams['action'] == 'create') {
        this.loadUserInfo();
      }
      else if (this.router.snapshot.queryParams['action'] == 'update') {
        this.adreeForm.patchValue(this.addressService.selectedShipmentAdressBehaviour.value);
      }
    }
  }

  async loadUserInfo() {
    if (this.network.type != 'none') {
      var loading = await super.showLoading(this.loadingCtrl, this.translateService.instant('Loading'));
      this.rest.GetUserById(await this.utils.getKey('userId')) // 填写url的参数
        .subscribe(
          result => {
            if (result != null) {
              this.adreeForm.patchValue({
                EntrepriseName: result.EntrepriseName != null ? result.EntrepriseName : '',
                ContactTelephone: result.PhoneNumber != null ? result.PhoneNumber : ''
              });
            } else {
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            }
            loading.dismiss()
          },
          error => {
            super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            loading.dismiss()
          });

    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
    }
  }

  async saveAdress() {
    /* Step1: make all ctrl in the group been touched */
    for (let i in this.adreeForm.controls) {
      this.adreeForm.controls[i].markAsTouched();
    }
    /* Step2: Check all the field has been valided*/
    if (this.adreeForm.invalid) {
      return;
    }
    if (this.network.type != 'none') {
      var criteria = {
        adress: this.adreeForm.value,
        userId: await this.utils.getKey('userId'),
        type: this.type
      }
      var loading = await super.showLoading(this.loadingCtrl, this.translateService.instant('Loading'));
      this.rest.CreateOrUpdateAdress(criteria) // 填写url的参数
        .subscribe(
          f => {
            if (f.Success && f.Data != null) {
              if (this.type == "facturationAdress") {
                this.addressService.facturationAddressBehaviour.next(this.adreeForm.value);
                this.navCtrl.back();
              }
              else if (this.type = "shippingAdress") {
                // todo handle the two case 
                let shippingAddress = this.adreeForm.value;
                if (f.Data.AdressId != null) {
                  shippingAddress.Id = f.Data.AdressId;
                }
                this.addressService.selectedShipmentAdressBehaviour.next(shippingAddress);
                this.navCtrl.back();
              }
              loading.dismiss();
            } else {
              loading.dismiss()
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            }
          },
          error => {
            loading.dismiss();
            super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
          });

    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
    }
  }

  get f() { return this.adreeForm.controls; }

}
