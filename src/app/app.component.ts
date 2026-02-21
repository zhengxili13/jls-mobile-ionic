import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { RestService } from './service/rest.service';
import { UtilsService } from './service/utils.service';
import { timer } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private translate: TranslateService,
    private rest: RestService,
    private utils: UtilsService,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await StatusBar.setStyle({ style: Style.Light });
      await SplashScreen.hide();

      // Set default language 
      var lang = await this.utils.getKey('lang');
      if (lang != null) {
        this.translate.setDefaultLang(lang);
      }
      else {
        this.translate.setDefaultLang('fr');
      }
      // Get no readed message every minute 
      timer(0, 60000).subscribe(() => { // ms
        if (localStorage.getItem('userId') != null) {
          this.rest.GetNoReadMessageCount({ UserId: localStorage.getItem('userId') }).subscribe(result => {
            if (result != null) {
              // TODO: Migration to rxjs subscriber 
              // this.event.publish('message:new', result);
              this.utils.newMessageNumberSubject.next(result);
            }
          });
        }
      });

      // check if is logined 
      var token = localStorage.getItem('jwt');
      var userId = localStorage.getItem('userId');
      if(token!= null && userId!= null ){
        this.utils.isLoginedSubject.next(true);
      }
      else{
        this.utils.isLoginedSubject.next(false);
      }
    });
  }

 async ngOnInit() {
  // If using a custom driver:
  // await this.storage.defineDriver(MyCustomDriver)
  await this.storage.create();
}
}
