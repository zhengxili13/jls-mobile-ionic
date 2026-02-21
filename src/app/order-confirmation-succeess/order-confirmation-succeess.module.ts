import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderConfirmationSucceessPageRoutingModule } from './order-confirmation-succeess-routing.module';

import { OrderConfirmationSucceessPage } from './order-confirmation-succeess.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderConfirmationSucceessPageRoutingModule,
    TranslateModule
  ],
  declarations: [OrderConfirmationSucceessPage]
})
export class OrderConfirmationSucceessPageModule {}
