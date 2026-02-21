import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadOrderDetailsPage } from './read-order-details.page';

const routes: Routes = [
  {
    path: '',
    component: ReadOrderDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadOrderDetailsPageRoutingModule {}
