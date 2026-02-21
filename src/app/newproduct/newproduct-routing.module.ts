import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewproductPage } from './newproduct.page';

const routes: Routes = [
  {
    path: '',
    component: NewproductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewproductPageRoutingModule {}
