import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectShippingAdressPageRoutingModule } from './select-shipping-adress-routing.module';

import { SelectShippingAdressPage } from './select-shipping-adress.page';
import { TranslateModule } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectShippingAdressPageRoutingModule,
    MatRadioModule,
    TranslateModule
  ],
  declarations: [SelectShippingAdressPage]
})
export class SelectShippingAdressPageModule {}
