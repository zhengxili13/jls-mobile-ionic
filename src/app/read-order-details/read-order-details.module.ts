import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadOrderDetailsPageRoutingModule } from './read-order-details-routing.module';

import { ReadOrderDetailsPage } from './read-order-details.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadOrderDetailsPageRoutingModule,
    TranslateModule
  ],
  declarations: [ReadOrderDetailsPage]
})
export class ReadOrderDetailsPageModule {}
