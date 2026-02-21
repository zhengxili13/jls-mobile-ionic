import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyUserInfoPage } from './modify-user-info.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyUserInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyUserInfoPageRoutingModule {}
