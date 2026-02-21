import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistreSuccedPageRoutingModule } from './registre-succed-routing.module';

import { RegistreSuccedPage } from './registre-succed.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistreSuccedPageRoutingModule,
    TranslateModule
  ],
  declarations: [RegistreSuccedPage]
})
export class RegistreSuccedPageModule {}
