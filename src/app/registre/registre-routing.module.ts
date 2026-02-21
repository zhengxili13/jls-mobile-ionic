import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrePage } from './registre.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrePageRoutingModule {}
