import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WriteProductEvaluationPageRoutingModule } from './write-product-evaluation-routing.module';

import { WriteProductEvaluationPage } from './write-product-evaluation.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WriteProductEvaluationPageRoutingModule,
    TranslateModule,
    ComponentsModule
  ],
  declarations: [WriteProductEvaluationPage]
})
export class WriteProductEvaluationPageModule {}
