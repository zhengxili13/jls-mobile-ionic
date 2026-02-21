import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAccountPageRoutingModule } from './my-account-routing.module';

import { MyAccountPage } from './my-account.page';
import { TranslateModule } from '@ngx-translate/core';
import { LoginPageModule } from '../login/login.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAccountPageRoutingModule,
    TranslateModule,
    LoginPageModule
  ],
  declarations: [MyAccountPage]
})
export class MyAccountPageModule {}
