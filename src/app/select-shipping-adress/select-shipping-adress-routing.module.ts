import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectShippingAdressPage } from './select-shipping-adress.page';

const routes: Routes = [
  {
    path: '',
    component: SelectShippingAdressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectShippingAdressPageRoutingModule {}
