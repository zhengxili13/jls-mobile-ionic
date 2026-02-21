import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadOrderListPage } from './read-order-list.page';

const routes: Routes = [
  {
    path: '',
    component: ReadOrderListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadOrderListPageRoutingModule {}
