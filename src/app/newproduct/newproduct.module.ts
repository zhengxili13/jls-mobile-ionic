import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewproductPageRoutingModule } from './newproduct-routing.module';

import { NewproductPage } from './newproduct.page';
import { TranslateModule } from '@ngx-translate/core';
import { AdvancedSearchPage } from '../advanced-search/advanced-search.page';
import { AdvancedSearchPageModule } from '../advanced-search/advanced-search.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewproductPageRoutingModule,
    TranslateModule,
    AdvancedSearchPageModule
  ],
  declarations: [NewproductPage]
})
export class NewproductPageModule {}
