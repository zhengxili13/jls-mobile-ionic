import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonMeterComponent } from './ion-meter/ion-meter.component';
import { AppStarRatingComponent } from './app-star-rating/app-star-rating.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [IonMeterComponent, AppStarRatingComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  exports: [IonMeterComponent, AppStarRatingComponent]
})
export class ComponentsModule { }
