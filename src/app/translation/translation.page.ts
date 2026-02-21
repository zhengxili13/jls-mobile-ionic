import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../service/utils.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.page.html',
  styleUrls: ['./translation.page.scss'],
})
export class TranslationPage implements OnInit {
  public selectedLang: any;
  constructor(
    public navCtrl: NavController, 
    public storage : Storage,
    public translate: TranslateService,
    public utilis:UtilsService,
    public modalCtrl: ModalController) { }

  ngOnInit() {
    this.selectedLang = this.translate.defaultLang ;
  }

  changeLang(){
    this.translate.setDefaultLang(this.selectedLang);
    this.storage.set('lang', this.selectedLang);
    this.modalCtrl.dismiss();
  }

}
