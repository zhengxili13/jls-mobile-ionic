import { Component, OnInit } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { NavController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { RestService } from '../service/rest.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@awesome-cordova-plugins//network/ngx';
import { UtilsService } from '../service/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseUI {
  email: string;
  password: string;
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public rest: RestService,
    public toastCtrl: ToastController,
    public storage: Storage,
    public modalCtrl: ModalController,
    public network: Network,
    public translateService: TranslateService,
    public utils: UtilsService
  ) {
    super();
  }

  ngOnInit() {
  }


  async login() {
    // this.viewCtrl.dismiss();

    if (this.network.type != 'none') {
      var loading = await this.showLoading(this.loadingCtrl, this.translateService.instant("Loading"));
      var LoginInfo = {
        Email: this.email,
        Password: btoa(this.password),
      };
      // this.navCtrl.parent.select(0); // 跳转tabs
      this.rest.getNewRefreshToken(LoginInfo) // 填写url的参数
        .subscribe(
          f => {
            if (f != null && f.authToken != null) {
              localStorage.setItem('login  Status', '1');
              localStorage.setItem('jwt', f.authToken.token);
              localStorage.setItem('username', f.authToken.username);
              localStorage.setItem('userId', f.authToken.userId);
              localStorage.setItem('expiration', f.authToken.expiration);
              localStorage.setItem('userRole', f.authToken.roles);
              localStorage.setItem('refreshToken', f.authToken.refresh_token);
              //this.router.navigate(['sample']);


              this.storage.set('userId', f.authToken.userId);
              this.storage.set('jwt', f.authToken.token);
              this.storage.set('refreshToken', f.authToken.refresh_token);

              this.utils.isLoginedSubject.next(true);

              this.modalCtrl.dismiss();
            }
            else{
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            }

            loading.dismiss();
          },
          error => {
            if (error!= null) {
              if (error.LoginError != null) {
                super.showToast(this.toastCtrl, this.translateService.instant(error.LoginError));
              }
            }
            else {
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            }

            loading.dismiss();
          });
    }
    else {
      this.loadingCtrl, this.translateService.instant("Msg_Offline")
    }
  }

  registre() {
    // this.appCtrl.getRootNavs()[0].push('RegistrePage');
    this.modalCtrl.dismiss();
    this.navCtrl.navigateRoot('RegistrePage');
  }

  findOutPassword() {
    this.modalCtrl.dismiss();
    this.navCtrl.navigateRoot('ForgetPasswordPage');
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
