import { Component, OnInit } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { RestService } from '../service/rest.service';
import { Network } from '@awesome-cordova-plugins//network/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage  extends BaseUI {

  public email : string;
  constructor(
    public navCtrl: NavController, 
    private rest : RestService, 
    public network: Network,
    public toastCtrl: ToastController ,
    public translateService : TranslateService,
    public loadingCtrl: LoadingController
  ) { 
    super();
  }

  ngOnInit() {
  }


  async sendEmail(){
    if(this.email !=null && this.email!= ''){
      if (this.network.type != 'none') {
        var loading = await this.showLoading(this.loadingCtrl,this.translateService.instant('Loading')); 

       // this.navCtrl.parent.select(0); // 跳转tabs
        this.rest.SendPasswordResetLink(this.email) // 填写url的参数
          .subscribe(
            f => {
              if(f!=null && f.Success == true){
                this.navCtrl.navigateRoot('RegistreSuccedPage', {
                  queryParams:{
                    page:'ForgetPasswordPage',
                    email:f.Data
                  }
                })
              }
              else {
                super.showToast(this.toastCtrl, this.translateService.instant('forget-password.AccountNotExists')); 
              }

              loading.dismiss();
            },
            error => {
              super.showToast(this.toastCtrl, this.translateService.instant('Msg_Error')); 
              
            });
      }
      else {
        super.showToast(this.toastCtrl, this.translateService.instant('Msg_Offline')); 
      }
    }
  }
}
