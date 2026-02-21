import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubCategoryListPage } from './sub-category-list.page';

const routes: Routes = [
  {
    path: '',
    component: SubCategoryListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubCategoryListPageRoutingModule {}
