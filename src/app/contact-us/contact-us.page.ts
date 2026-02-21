import { Component, Input, OnInit } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { NavController, ToastController, LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { RestService } from '../service/rest.service';
import { Network } from '@awesome-cordova-plugins//network/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage extends BaseUI {
  address: string;
  phone: string;
  fax: string;
  email: string;

  @Input() SystemMessage: any;

  public isSystemMessage: boolean = false;
  public criteria: any = {
    Title: null,
    Body: null,
    OrderId: null
  }

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public rest: RestService,
    public network: Network,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: ActivatedRoute) {
    super();

  }

  ngOnInit() {

    this.rest.GetReferenceItemsByCategoryLabels({
      shortLabels: ['StoreInfomation']
    }) // 填写url的参数
      .subscribe(
        result => {
          this.address = result.find(p => p.Code == "StoreInfo_Address").Label;
          this.phone = result.find(p => p.Code == "StoreInfo_Telephone").Label;
          this.fax = result.find(p => p.Code == "StoreInfo_Fax").Label;
          this.email = result.find(p => p.Code == "StoreInfo_Email").Label;
        },
        error => {
          super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
        });

    if (this.router.snapshot.queryParams['OrderId'] != null) {
      //
      this.criteria.OrderId = this.router.snapshot.queryParams['OrderId'];
    }

    if (this.SystemMessage != null) {
      var SystemMessage = this.SystemMessage;
      this.criteria.Title = SystemMessage.Title;
      this.criteria.Body = SystemMessage.Body;
      this.isSystemMessage = true;
      if (this.network.type != 'none') {

        this.rest.UpdateMessageStatus({
          MessageId: SystemMessage.Id,
          Status: true,
          UserId: localStorage.getItem('userId')
        }) // 填写url的参数
          .subscribe(
            f => { },
            error => {
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            });
      }
      else {
        super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
      }
    }
  }



  dismiss() {
    this.modalCtrl.dismiss();
  }

  async save() {
    console.log(this.criteria);


    if (this.network.type != 'none') {
      var loading = await this.showLoading(this.loadingCtrl, this.translateService.instant('Loading'));

      var MessageInfo: any = {};
      this.criteria.SenderEmail = localStorage.getItem('username');
      MessageInfo.Message = this.criteria;
      MessageInfo.FromUserId = localStorage.getItem('userId');

      // this.navCtrl.parent.select(0); // 跳转tabs
      this.rest.SaveMessage(MessageInfo) // 填写url的参数
        .subscribe(
          f => {
            if (f > 0) {
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_SaveSuccess"));

              this.navCtrl.back();
            }
            else {
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

}
