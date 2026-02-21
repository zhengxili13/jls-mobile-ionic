import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WriteProductEvaluationPage } from './write-product-evaluation.page';

const routes: Routes = [
  {
    path: '',
    component: WriteProductEvaluationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WriteProductEvaluationPageRoutingModule {}
