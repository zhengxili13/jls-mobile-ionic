import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { RestService } from '../service/rest.service';
import { Network } from '@awesome-cordova-plugins//network/ngx';
import { TranslateService } from '@ngx-translate/core';
import { BaseUI } from '../common/baseui';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage extends BaseUI {
  public loading: boolean = true;
  categoryList: any[];

  constructor(public navCtrl: NavController,
    public rest: RestService,
    public network: Network,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    // todo: migrate to right life-cycle function
    this.loadMainCategoryList();
  }

  secondMenu(ReferenceId: number, RefereceLabel: string) {
    this.navCtrl.navigateForward('SubCategoryListPage', {
      queryParams: {
        ReferenceId: ReferenceId,
        RefereceLabel: RefereceLabel
      }
    });
  }

  loadMainCategoryList() {
    if (this.network.type != 'none') {
      this.rest.GetProductMainCategory() // 填写url的参数
        .subscribe(
          f => {
            if (f.Success && f.Data != null) {
              this.categoryList = f.Data;
            } else {
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            }
            this.loading = false
          },
          error => {
            super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            this.loading = false
          });

    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
    }
  }

}
