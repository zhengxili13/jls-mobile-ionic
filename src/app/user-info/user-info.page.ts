import { Component, OnInit } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Network } from '@awesome-cordova-plugins//network/ngx';
import { RestService } from '../service/rest.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage extends BaseUI {
  public UserInfo: any = {};

  constructor(
    public navCtrl: NavController,
    public network: Network,
    public rest: RestService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public router: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
  
  }

  ionViewWillEnter(){
    this.loadUserinfo();
  }
  
  ionViewDidEnter() {
    this.UserInfo = this.router.snapshot.queryParams['UserInfo'] || this.UserInfo;
    this.UserInfo.Email = localStorage.getItem('username');
  }

  async loadUserinfo() {
    if (this.network.type != 'none') {
      var loading = await super.showLoading(this.loadingCtrl, this.translateService.instant('Loading'));
      this.rest.GetUserById(localStorage.getItem('userId'))
        .subscribe(
          f => {
            if (f != null) {
              this.UserInfo = f;
            }
            else {
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            }
            loading.dismiss();
          },
          error => {
            loading.dismiss()
            super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
          });
    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
    }
  }

  modifyPersonInfo() {
    this.navCtrl.navigateForward('ModifyUserInfoPage',
      {
        queryParams:
        {
          UserInfo: JSON.stringify(this.UserInfo)
        }
      });
  }


  myAvis() {
    this.navCtrl.navigateForward('ProductEvaluationListPage', {
      queryParams: {
        type: "GetCommentByUserId"// by userId
      }
    });
  }

  myFavorite() {
    this.navCtrl.navigateForward('NewproductPage',
      {
        queryParams: {
          Title: this.translateService.instant("Meslistes"),
          PageType: 'FavoriteList'
        }
      });
  }
}
