import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductEvaluationListPage } from './product-evaluation-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProductEvaluationListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductEvaluationListPageRoutingModule {}
