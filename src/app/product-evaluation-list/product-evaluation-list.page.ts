import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseUI } from '../common/baseui';
import { NavController, ToastController } from '@ionic/angular';
import { Network } from '@awesome-cordova-plugins//network/ngx';
import { RestService } from '../service/rest.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-evaluation-list',
  templateUrl: './product-evaluation-list.page.html',
  styleUrls: ['./product-evaluation-list.page.scss'],
})
export class ProductEvaluationListPage extends BaseUI {
  type: string;
  step: number = 10;
  counter: number = 0;
  productCommentList: any[] = [];
  loading: boolean = true;
  public host = environment.SERVER_API_URL;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public network: Network,
    public rest: RestService,
    public translateServce: TranslateService,
    public router: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.type = this.router.snapshot.queryParams['type'];
    this.loadProductComment();
  }

  loadProductComment() {
    var criteria = null;
    switch (this.type) {
      case 'GetCommentByProductId':
        var productId = this.router.snapshot.queryParams['productId'];
        criteria = {
          ProductId: productId,
          Begin: this.counter,
          Step: this.step
        }
        break;
      case 'GetCommentByUserId':
        var userId = localStorage.getItem('userId');
        criteria = {
          UserId: userId,
          Begin: this.counter,
          Step: this.step
        }
        break;
      default:
        criteria = {
          Begin: this.counter,
          Step: this.step
        }
        break;
    }
    this.rest.GetProductCommentListByCriteria(criteria) //TODO: change
      .subscribe(
        (f: any) => {
          if (f.Success) {
            console.log(f["Data"].ProductCommentListData)//todo: remove
            this.productCommentList = f["Data"].ProductCommentListData;
          } else {
            super.showToast(this.toastCtrl, this.translateServce.instant("Msg_Error"));
          }
        },
        error => {
          super.showToast(this.toastCtrl, this.translateServce.instant("Msg_Error"));
        },
        () => {
          this.loading = false;
        }
      );
  }

  doInfinite(infiniteScroll) {
    if (this.network.type != 'none') {
      var criteria = null;
      this.counter = this.counter + 1;
      switch (this.type) {
        case 'ProductEvaluationListPage':
          var productId = this.router.snapshot.queryParams['productId'];
          criteria = {
            ProductId: productId,
            Begin: this.counter,
            Step: this.step
          }
          break;
        case 'GetCommentByUserId':
          var userId = localStorage.getItem('userId');
          criteria = {
            UserId: userId,
            Begin: this.counter,
            Step: this.step
          }
        default:
          criteria = {
            Begin: this.counter,
            Step: this.step
          }
          break;
      }


      this.rest.GetProductCommentListByCriteria(criteria) //TODO: change
        .subscribe(
          (f: any) => {
            if (f.Success) {
              if (f["Data"].TotalCount <= this.step * this.counter) {
                infiniteScroll.target.complete();
                // Disable the infinite scroll
                infiniteScroll.target.disabled = true;
              }
              else {
                this.productCommentList = this.productCommentList.concat(f["Data"].ProductCommentListData != null ? f["Data"].ProductCommentListData : []);
                infiniteScroll.complete();
              }
            } else {
              super.showToast(this.toastCtrl, this.translateServce.instant("Msg_Error"));
            }
          },
          error => {
            super.showToast(this.toastCtrl, this.translateServce.instant("Msg_Error"));
          }
        );

    }
    else {
      super.showToast(this.toastCtrl, this.translateServce.instant("Msg_Offline"));
    }
  }

}
