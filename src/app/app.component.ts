import { Component, OnDestroy, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { RestService } from './service/rest.service';
import { UtilsService } from './service/utils.service';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private timerSub: Subscription;

  constructor(
    private platform: Platform,
    private translate: TranslateService,
    private rest: RestService,
    private utils: UtilsService,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  private initializeApp() {
    this.platform.ready().then(async () => {
      await StatusBar.setStyle({ style: Style.Light });
      await SplashScreen.hide();

      // Set default language
      const lang = await this.utils.getKey('lang');
      this.translate.setDefaultLang(lang ?? 'fr');

      // Get unread message count every minute
      this.timerSub = timer(0, 60000).subscribe(() => {
        const userId = localStorage.getItem('userId');
        if (userId != null) {
          this.rest.GetNoReadMessageCount({ UserId: userId }).subscribe(result => {
            if (result != null) {
              this.utils.newMessageNumberSubject.next(result);
            }
          });
        }
      });

      // Check if user is logged in
      const token = localStorage.getItem('jwt');
      const userId = localStorage.getItem('userId');
      this.utils.isLoginedSubject.next(token != null && userId != null);
    });
  }

  async ngOnInit() {
    await this.storage.create();
  }

  ngOnDestroy() {
    this.timerSub?.unsubscribe();
  }
}
