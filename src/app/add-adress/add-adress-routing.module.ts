import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAdressPage } from './add-adress.page';

const routes: Routes = [
  {
    path: '',
    component: AddAdressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAdressPageRoutingModule {}
