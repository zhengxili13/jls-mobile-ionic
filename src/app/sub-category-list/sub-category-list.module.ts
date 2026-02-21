import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubCategoryListPageRoutingModule } from './sub-category-list-routing.module';

import { SubCategoryListPage } from './sub-category-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubCategoryListPageRoutingModule,
    TranslateModule
  ],
  declarations: [SubCategoryListPage]
})
export class SubCategoryListPageModule {}
