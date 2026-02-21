import { Component, OnInit } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { RestService } from '../service/rest.service';
import { NavController, ToastController } from '@ionic/angular';
import { Network } from '@awesome-cordova-plugins//network/ngx';
import { UtilsService } from '../service/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read-order-list',
  templateUrl: './read-order-list.page.html',
  styleUrls: ['./read-order-list.page.scss'],
})
export class ReadOrderListPage extends BaseUI {

  orderList: any[] = [];
  loading: boolean = true;

  constructor(
    public navCtrl: NavController,
    public rest: RestService,
    public network: Network,
    public utils: UtilsService,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public router: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.loadOrderList();
  }


  commandeDetail(order) {
    this.navCtrl.navigateForward('ReadOrderDetailsPage', {
      queryParams: {
        OrderId: order.Id
      }
    });
  }

  async loadOrderList() {
    if (this.network.type != 'none') {
      var UserId = parseInt(await this.utils.getKey('userId'));
      var orderType = this.router.snapshot.queryParams['orderType'];
      this.rest.GetOrdersListByUserId(UserId, orderType) // 填写url的参数
        .subscribe(
          f => {
            if (f.Success && f.Data != null) {
              this.orderList = f.Data;
              console.log(this.orderList);
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

  getStatusClass(StatusCode) {
    var statusColor = "warning";
    switch (StatusCode) {
      case 'OrderStatus_Valid':
        statusColor = "success"
        break;
      case 'OrderStatus_Refus':
        statusColor = "danger"
        break;
      case 'OrderStatus_Progressing':
        statusColor = "warning"
        break;
      case 'OrderStatus_Virement':
        statusColor = "virement"
        break;
      case 'OrderStatus_Preparing':
        statusColor = "secondary"
        break;
    }
    return statusColor;
  }

}
