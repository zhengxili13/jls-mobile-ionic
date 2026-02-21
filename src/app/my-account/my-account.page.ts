import { Component, OnInit } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UtilsService } from '../service/utils.service';
import { RestService } from '../service/rest.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationPage } from '../translation/translation.page';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage extends BaseUI {


  public notLogin: boolean = true;
  public logined: boolean = false;
  public username: string = "";


  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public storage: Storage,
    public utils: UtilsService,
    public rest: RestService,
    public toastCtrl: ToastController,
    public translateService: TranslateService

  ) {
    super();
    // TODO: migration to rxjs subscriber
    // event.subscribe('logout:logout', () => {
    //   super.showToast(this.toastCtrl, this.translateService.instant('Msg_ReLogin')); 
    //   this.navCtrl.popToRoot();
    // });
  }

  ngOnInit() {
  }


  async showModal() {
    let modal = await this.modalCtrl.create({
      component: LoginPage
    });

    modal.present();

    modal.onWillDismiss().then(() => {
      this.loadUserPage();
    });


    // modal.present();
  }

  async ionViewDidEnter() {
    await this.loadUserPage();
  }

  contactUs() {
    this.navCtrl.navigateForward('ContactUsPage', { queryParams: { Page: 'MyAccountPage' } });
  }

  aboutUs() {
    this.navCtrl.navigateForward('AboutUsPage');
  }

  loadUserPage() {

    var token = localStorage.getItem('jwt');
    var userId = localStorage.getItem('userId');
    if (userId == null || token == null) {
      this.notLogin = true; // don't commit
      this.logined = false;
    }
    else {
      this.notLogin = false;
      this.logined = true;

      this.username = localStorage.getItem('username');
    }

    if (this.logined) {
      this.loadNotReadMessage();
    }
  }
  logout() {

    localStorage.clear();

    this.storage.remove('userId');
    this.storage.remove('jwt');
    this.storage.remove('refreshToken');

    this.rest.logout(true);
    
    this.loadUserPage();
  }

  loadNotReadMessage() {
    // this.rest.GetNoReadMessageCount({ UserId: localStorage.getItem('userId') }).subscribe(result => {
    //   if (result != null) {
    //     
    //     // this.event.publish('message:new', result);
    //     this.utils.newMessageNumberSubject.next(result);
    //   }
    // })
  }

  readCommandList(orderType) {
    this.navCtrl.navigateForward('ReadOrderListPage', { queryParams: { orderType: orderType } });
  }

  async translation() {
    let modal = await this.modalCtrl.create({
      component: TranslationPage,
    });
    modal.present();
  }


  UserInfoPage() {
    this.navCtrl.navigateForward('UserInfoPage');
  }

  myAvis() {
    this.navCtrl.navigateForward('ProductEvaluationListPage');
  }

}
