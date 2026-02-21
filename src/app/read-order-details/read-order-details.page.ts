import { Component, OnInit } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { environment } from 'src/environments/environment';
import { RestService } from '../service/rest.service';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Network } from '@awesome-cordova-plugins//network/ngx';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read-order-details',
  templateUrl: './read-order-details.page.html',
  styleUrls: ['./read-order-details.page.scss'],
})
export class ReadOrderDetailsPage extends BaseUI {

  public host = environment.SERVER_API_URL;

  OrderId: number;
  OrderInfo: any = {};
  ShippingAdress: any = {};
  FacturationAdress: any = {};
  Status: any = {};
  ProductList: any = [];

  public ClientRemark: any = null;
  public AdminRemark: any = null;
  public ShippingMessage: string = "France de port 1500€HT, 2000€HT pour le sud de la France et 2500€HT pour les étangers.";

  loading: boolean;

  public TaxRate: number = 0;
  CustomerInfo: any = {};

  constructor(
    public navCtrl: NavController,
    public rest: RestService,
    public network: Network,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService,
    public router: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.OrderId = this.router.snapshot.queryParams['OrderId'];
    this.loadOrderDetail();
  }


  async loadOrderDetail() {
    if (this.network.type != 'none') {

      var loading = await this.showLoading(this.loadingCtrl, this.translateService.instant("Loading"));
      this.rest.GetOrdersListByOrderId(this.OrderId) // 填写url的参数
        .subscribe(
          f => {
            if (f.Success && f.Data != null) {
              if (f.Data.OrderInfo != null) {
                this.OrderInfo = f.Data.OrderInfo;
              }
              if (f.Data.FacturationAdress != null) {
                this.FacturationAdress = f.Data.FacturationAdress;
              }
              if (f.Data.ShippingAdress != null) {
                this.ShippingAdress = f.Data.ShippingAdress;
              }
              if (f.Data.Status != null) {
                this.Status = f.Data.Status;
              }
              if (f.Data.ProductList != null) {
                this.ProductList = f.Data.ProductList;
              }

              if (f.Data.TaxRate != null) {
                this.TaxRate = f.Data.TaxRate.Value;
              }
              if (f.Data.ClientRemark != null) {
                this.ClientRemark = f.Data.ClientRemark;
              }

              if (f.Data.CustomerInfo != null) {
                this.CustomerInfo = f.Data.CustomerInfo;
              }

              if (f.Data.AdminRemark != null) {
                this.AdminRemark = f.Data.AdminRemark;
              }
              if (f.Data.ShippingMessage != null) {
                this.ShippingMessage = f.Data.ShippingMessage;
              }
            } else {
              super.showToast(this.toastCtrl, f.Msg);
            }

            loading.dismiss();
          },
          error => {
            loading.dismiss();
            super.showToast(this.toastCtrl, error.Msg);

          }, () => this.loading = false);
    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
    }
  }


  calculBasicTotalPrice() {
    var TotalPrice = 0;
    if (this.ProductList != null && this.OrderInfo.TotalPriceHT == null) {
      this.ProductList.forEach(p => {
        if (p.Quantity != null && p.Price != null) {
          TotalPrice = TotalPrice + p.Quantity * p.Price * p.QuantityPerBox;
        }
      });
    }
    else {
      TotalPrice = this.OrderInfo.TotalPriceHT;
    }

    return TotalPrice;
  }

  ContactUs() {
    this.navCtrl.navigateForward('ContactUsPage', {
      queryParams: {
        OrderId: this.OrderInfo.Id,
        Page: 'ReadOrderDetailsPage'
      }
    });
  }

  getStatusClass(StatusCode) {
    var statusColor = "warning";
    switch (StatusCode) {
      case 'OrderStatus_Valid':
        statusColor = "Success"
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
