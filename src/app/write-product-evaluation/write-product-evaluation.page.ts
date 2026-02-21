import { Component, OnInit } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { UtilsService } from '../service/utils.service';
import { NetworkService } from '../service/network.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { RestService } from '../service/rest.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-write-product-evaluation',
  templateUrl: './write-product-evaluation.page.html',
  styleUrls: ['./write-product-evaluation.page.scss'],
})
export class WriteProductEvaluationPage extends BaseUI {


  level: number = 5;
  title: string;
  body: string;

  constructor(
    public navCtrl: NavController,
    public utils: UtilsService,
    public networkService: NetworkService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService,
    public rest: RestService,
    public router: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
  }

  async saveProductComment() {
    if (this.level != null && this.title != null && this.title != '') {
      var criteria = {
        Title: this.title,
        Body: this.body,
        Level: this.level,
        UserId: await this.utils.getKey('userId'),
        ProductId: this.router.snapshot.queryParams['productId']
      }
      const status = await this.networkService.getStatus();
      if (status.connected) {
        var loading = await super.showLoading(this.loadingCtrl, this.translateService.instant('Loading'));
        this.rest.SaveProductComment(criteria)
          .subscribe(
            f => {
              if (f.Success && f.Data != null) {
                super.showToast(this.toastCtrl, this.translateService.instant('Msg_Avisenregistre'));// TODO:translate
                this.navCtrl.pop();
              } else {
                super.showToast(this.toastCtrl, f.Msg);
              }
            },
            error => {
              super.showToast(this.toastCtrl, error.Msg);
            }, () => loading.dismiss());
      }
      else {
        super.showToast(this.toastCtrl, this.translateService.instant('Msg_Offline')); // todo translate
      }
    }
  }

}
