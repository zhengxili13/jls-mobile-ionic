import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistreSuccedPage } from './registre-succed.page';

const routes: Routes = [
  {
    path: '',
    component: RegistreSuccedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistreSuccedPageRoutingModule {}
