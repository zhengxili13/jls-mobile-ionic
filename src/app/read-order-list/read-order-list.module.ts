import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadOrderListPageRoutingModule } from './read-order-list-routing.module';

import { ReadOrderListPage } from './read-order-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadOrderListPageRoutingModule,
    TranslateModule
  ],
  declarations: [ReadOrderListPage]
})
export class ReadOrderListPageModule {}
