import { Component, OnInit } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { RestService } from '../service/rest.service';
import { Network } from '@awesome-cordova-plugins//network/ngx';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.page.html',
  styleUrls: ['./sub-category-list.page.scss'],
})
export class SubCategoryListPage extends BaseUI {


  loading: boolean = true;
  MainReferenceLabel: string = "";
  MainReferenceId: number = 0;
  categoryList: any[] = [];

  constructor(public navCtrl: NavController,
    public rest: RestService,
    public network: Network,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public router: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.MainReferenceId = this.router.snapshot.queryParams["ReferenceId"];
    this.MainReferenceLabel = this.router.snapshot.queryParams["RefereceLabel"];
    this.loadSecondProductCategory();
  }

  loadSecondProductCategory() {
    if (this.network.type != 'none') {
      this.rest.GetProductSecondCategory(this.MainReferenceId) // 填写url的参数
        .subscribe(
          f => {
            if (f.Success && f.Data != null) {
              this.categoryList = f.Data;
            } else {
              super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
            }
          },
          error => {
            super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
          }, () => this.loading = false);
    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
    }
  }

  productMenu(ReferenceId: number, RefereceLabel: string) {
    this.navCtrl.navigateForward('NewproductPage',
      {
        queryParams: {
          ReferenceId: ReferenceId,
          Title: RefereceLabel,
          PageType: 'BySecondCategory'
        }
      });
  }


}
