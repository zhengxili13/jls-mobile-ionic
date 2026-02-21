import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../service/utils.service';

@Component({
  selector: 'app-order-confirmation-succeess',
  templateUrl: './order-confirmation-succeess.page.html',
  styleUrls: ['./order-confirmation-succeess.page.scss'],
})
export class OrderConfirmationSucceessPage implements OnInit {
  public message: string = "";

  @Input() OrderId;
  @Input() Email;

  constructor(public navCtrl: NavController,
    public utils: UtilsService,
    public translateService: TranslateService,
    public router: ActivatedRoute,
    public modalCtrl: ModalController
  ) {

  }

  ngOnInit() {
    this.message = this.translateService.instant('page-order-confirmation-succeess.Message').replace('{Email}', this.Email);
  }

  async returnToAccueil() {
    await this.modalCtrl.dismiss();
    this.navCtrl.navigateRoot('');
  }
}
