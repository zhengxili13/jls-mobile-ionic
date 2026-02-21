import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseUI } from '../common/baseui';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { RestService } from '../service/rest.service';
import { Network } from '@awesome-cordova-plugins//network/ngx';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from '../service/address.service';
import { Iaddress } from '../interface/iaddress';

@Component({
  selector: 'app-modify-user-info',
  templateUrl: './modify-user-info.page.html',
  styleUrls: ['./modify-user-info.page.scss'],
})
export class ModifyUserInfoPage extends BaseUI {
  public userForm: FormGroup;

  public facturationAdress: Iaddress;
  public defaultShippingAdress: any = {};
  public UserInfo: any = {};

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public network: Network,
    public rest: RestService,
    public translateService: TranslateService,
    public router: ActivatedRoute,
    public addressService: AddressService
  ) {
    super();

    this.userForm = this.formBuilder.group({
      EntrepriseName: ['', Validators.required],
      Siret: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
    });
    this.addressService.facturationAddressBehaviour.subscribe(result=> this.facturationAdress = result);
    
    this.addressService.defaultShipmentAdressBehaviour.subscribe(result=> this.defaultShippingAdress = result);
  }


  ionViewWillEnter() {
    if(this.router.snapshot.queryParams['tempSelectedAdress']!=null ){
      this.defaultShippingAdress = JSON.parse (this.router.snapshot.queryParams['tempSelectedAdress']);
    }
    else{
      this.defaultShippingAdress = this.defaultShippingAdress
    }
    if(this.router.snapshot.queryParams['facturationAdress']!=null){
      this.facturationAdress = JSON.parse(this.router.snapshot.queryParams['facturationAdress']);
    }
    else{
      this.facturationAdress = this.facturationAdress;
    }
  }

  ngOnInit() {
    var userInfoStringfy = this.router.snapshot.queryParams['UserInfo'];
    this.UserInfo = userInfoStringfy != null ? JSON.parse(userInfoStringfy) : {};

    this.userForm.patchValue({
      EntrepriseName: this.UserInfo.EntrepriseName,
      Siret: this.UserInfo.Siret,
      PhoneNumber: this.UserInfo.PhoneNumber
    });


    if (this.UserInfo.FacturationAdress != null) {
      this.addressService.facturationAddressBehaviour.next(this.UserInfo.FacturationAdress);
    }

    if (this.UserInfo.ShippingAdress != null && this.UserInfo.ShippingAdress.length > 0) {
      /* If default address is not setted, take the first one in the list */
      var defaultShippingAdress = this.UserInfo.ShippingAdress.find(p => p.IsDefaultAdress == true);
      defaultShippingAdress = defaultShippingAdress == null ? this.UserInfo.ShippingAdress[0] : defaultShippingAdress;
      this.addressService.defaultShipmentAdressBehaviour.next(defaultShippingAdress);
    }
  }

  modifyFacturationAdress() {
    this.navCtrl.navigateForward('AddAdressPage', {
      queryParams: {
        type: 'facturationAdress',
        currentPage : 'ModifyUserInfoPage'
      }
    });
  }

  selectShippingAdress() {
    //this.ChangeAddress = true;
    this.navCtrl.navigateForward('SelectShippingAdressPage', {
      queryParams: {
        CurrentPage: 'ModifyUserInfoPage'
      }
    });
  }

  async saveUserInfo() {
    /* Step1: make all ctrl in the group been touched */
    for (let i in this.userForm.controls) {
      this.userForm.controls[i].markAsTouched();
    }
    /* Step2: Check all the field has been valided*/
    if (this.userForm.invalid) {
      return;
    }
    if (this.network.type != 'none') {
      console.log(this.userForm.value);
      var criteria = this.userForm.value;
      criteria.UserId = localStorage.getItem('userId');
      criteria.DefaultShippingAddressId = this.defaultShippingAdress != null ? this.defaultShippingAdress.Id : 0;

      var loading = await super.showLoading(this.loadingCtrl, this.translateService.instant('Loading'));
      this.rest.UpdateUserInfo(criteria) // 填写url的参数
        .subscribe(
          f => {
            if (f != null && f > 0) {

              this.UserInfo.EntrepriseName = this.userForm.value.EntrepriseName;
              this.UserInfo.Siret = this.userForm.value.Siret;
              this.UserInfo.PhoneNumber = this.userForm.value.PhoneNumber;
              this.UserInfo.FacturationAdress = this.facturationAdress;

              this.addressService.facturationAddressBehaviour.next(this.facturationAdress);

              super.showToast(this.toastCtrl, this.translateService.instant("Msg_SaveSuccess"));
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

}
