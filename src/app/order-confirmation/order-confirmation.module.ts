import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderConfirmationPageRoutingModule } from './order-confirmation-routing.module';

import { OrderConfirmationPage } from './order-confirmation.page';
import { TranslateModule } from '@ngx-translate/core';
import { OrderConfirmationSucceessPageModule } from '../order-confirmation-succeess/order-confirmation-succeess.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderConfirmationPageRoutingModule,
    TranslateModule,
    OrderConfirmationSucceessPageModule
  ],
  declarations: [OrderConfirmationPage]
})
export class OrderConfirmationPageModule {}
