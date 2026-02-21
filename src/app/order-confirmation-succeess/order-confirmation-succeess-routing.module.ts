import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderConfirmationSucceessPage } from './order-confirmation-succeess.page';

const routes: Routes = [
  {
    path: '',
    component: OrderConfirmationSucceessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderConfirmationSucceessPageRoutingModule {}
