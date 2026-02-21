import { Component, OnInit } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { FormBuilder } from '@angular/forms';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { RestService } from '../service/rest.service';
import { Network } from '@awesome-cordova-plugins//network/ngx';
import { ContactUsPage } from '../contact-us/contact-us.page';
import { UtilsService } from '../service/utils.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage extends BaseUI {


  public counter: number = 0;
  public step: number = 15;
  public messageList: any[] = [];
  public loading: boolean = false;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public rest: RestService,
    public network: Network,
    public modalCtrl: ModalController,
    public utils: UtilsService

  ) {
    super();
  }

  ngOnInit() {
    // this.loadMesage();
  }


  ionViewWillEnter() {
    // execute every time
    this.loadMesage();
  }


  loadMesage() {
    if (this.network.type != 'none') {
      var criteria = {
        UserId: localStorage.getItem('userId'),
        Step: this.step,
        Begin: this.counter
      }
      this.loading = true
      this.rest.GetMessageByUserAndStatus(criteria) // 填写url的参数
        .subscribe(
          result => {
            if (result.List != null && result.List.length > 0) {
              this.messageList = result.List;

              var count = this.messageList.filter(p => p.IsReaded == false).length;
        
              // this.event.publish('message:new', count);
              // this.utils.newMessageNumberSubject.next(count)
            }

            this.loading = false;
          },
          error => {
            this.loading = false;
            super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
          });
    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
    }
  }

  async readDetailInfo(message) {

    if (message.IsReaded == null || message.IsReaded == false) {
      var newMessageCount = this.utils.newMessageNumberSubject.value;
      this.utils.newMessageNumberSubject.next(newMessageCount - 1);
    }

    var modal = await this.modalCtrl.create({
      component: ContactUsPage,
      componentProps: {
        SystemMessage: message
      }
    });

    await modal.present();
    modal.onDidDismiss().then(() => {
      this.loadMesage();
    })
  }


  doInfinite(infiniteScroll) {
    if (this.network.type != 'none') {
      this.counter = this.counter + 1;
      var criteria = {
        UserId: localStorage.getItem('userId'),
        Step: this.step,
        Begin: this.counter
      }
      this.rest.GetMessageByUserAndStatus(criteria)
        .subscribe(
          (result: any) => {
            if (result != null && result.List != null) {
              if (result.TotalCount <= this.step * this.counter) {
                infiniteScroll.target.complete();
                // Disable the infinite scroll
                infiniteScroll.target.disabled = true;
              }
              else {
                this.messageList = this.messageList.concat(result.List != null ? result.List : []);
                infiniteScroll.target.complete();
              }
            } else {
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            }
          },
          error => {
            super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
          }
        );
    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
    }
  }

}
