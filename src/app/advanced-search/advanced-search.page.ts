import { Component, OnInit, Input } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { RestService } from '../service/rest.service';
import { Network } from '@awesome-cordova-plugins//network/ngx';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.page.html',
  styleUrls: ['./advanced-search.page.scss'],
})
export class AdvancedSearchPage extends BaseUI {

  @Input() criteriaPassed: any;


  public criteria: any = {
    SearchText: null,
    MainCategory: null,
    SecondCategory: null,
    PriceInterval: { lower: 0, upper: 200 },
    MinQuantity: 200,
    OrderBy: null
  };
  public ReferenceList: any[] = [];
  public MainCategoryList: any[] = [];

  public OrderByList: any[] = [
    'Price_Increase',
    'Price_Decrease',
    'PublishDate_Recent',
    'Porpularity_More'
  ];

  constructor(public navCtrl: NavController,
    public translateService: TranslateService,
    public rest: RestService,
    public network: Network,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) {
    super();
  }

  ngOnInit() {
    console.log('ionViewDidLoad AdvancedSearchPage');
    this.criteria = this.criteriaPassed || this.criteria;
    this.loadMainCategoryAndSecondCategory();
  }

  translateOrderByItem(item) {
    return this.translateService.instant('advanced-search.' + item);
  }
  loadMainCategoryAndSecondCategory() {
    if (this.network.type != 'none') {
      this.rest.GetReferenceItemsByCategoryLabels(
        {
          ShortLabels: ['MainCategory', 'SecondCategory'],
          Lang: this.translateService.defaultLang
        }
      ).subscribe(result => {
        if (result != null && result.length > 0) {
          this.ReferenceList = result;
          this.MainCategoryList = result.filter(f => f.ReferenceCategoryLabel == "MainCategory");
        }
      },
        error => {
          super.showToast(this.toastCtrl, this.translateService.instant("Msg_Error"));
        });
    }
    else {
      super.showToast(this.toastCtrl, this.translateService.instant("Msg_Offline"));
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  getSecondCategoryList() {
    if (this.criteria.MainCategory != null) {
      return this.ReferenceList.filter(p => p.ParentId == this.criteria.MainCategory);
    }
    else {
      return [];
    }
  }

  search() {
    this.modalCtrl.dismiss(this.criteria);
  }
}
