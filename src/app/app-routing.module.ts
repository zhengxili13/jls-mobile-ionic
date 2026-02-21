import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'NewproductPage',
    loadChildren: () => import('./newproduct/newproduct.module').then(m => m.NewproductPageModule)
  },
  {
    path: 'CategoryListPage',
    loadChildren: () => import('./category-list/category-list.module').then(m => m.CategoryListPageModule)
  },
  {
    path: 'SubCategoryListPage',
    loadChildren: () => import('./sub-category-list/sub-category-list.module').then(m => m.SubCategoryListPageModule)
  },
  {
    path: 'ProductDetailPage',
    loadChildren: () => import('./product-detail/product-detail.module').then(m => m.ProductDetailPageModule)
  },
  {
    path: 'SearchPage',
    loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'RegistrePage',
    loadChildren: () => import('./registre/registre.module').then(m => m.RegistrePageModule)
  },
  {
    path: 'RegistreSuccedPage',
    loadChildren: () => import('./registre-succed/registre-succed.module').then(m => m.RegistreSuccedPageModule)
  },
  {
    path: 'ForgetPasswordPage',
    loadChildren: () => import('./forget-password/forget-password.module').then(m => m.ForgetPasswordPageModule)
  },
  {
    path: 'AboutUsPage',
    loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsPageModule)
  },
  {
    path: 'ContactUsPage',
    loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsPageModule)
  },
  {
    path: 'ProductEvaluationListPage',
    loadChildren: () => import('./product-evaluation-list/product-evaluation-list.module').then(m => m.ProductEvaluationListPageModule)
  },
  {
    path: 'UserInfoPage',
    loadChildren: () => import('./user-info/user-info.module').then(m => m.UserInfoPageModule)
  },
  {
    path: 'ModifyUserInfoPage',
    loadChildren: () => import('./modify-user-info/modify-user-info.module').then(m => m.ModifyUserInfoPageModule)
  },
  {
    path: 'ReadOrderListPage',
    loadChildren: () => import('./read-order-list/read-order-list.module').then(m => m.ReadOrderListPageModule)
  },
  {
    path: 'ReadOrderDetailsPage',
    loadChildren: () => import('./read-order-details/read-order-details.module').then(m => m.ReadOrderDetailsPageModule)
  },
  {
    path: 'AddAdressPage',
    loadChildren: () => import('./add-adress/add-adress.module').then(m => m.AddAdressPageModule)
  },
  {
    path: 'NotificationPage',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationPageModule)
  },
  {
    path: 'WriteProductEvaluationPage',
    loadChildren: () => import('./write-product-evaluation/write-product-evaluation.module').then(m => m.WriteProductEvaluationPageModule)
  },
  {
    path: 'SelectShippingAdressPage',
    loadChildren: () => import('./select-shipping-adress/select-shipping-adress.module').then(m => m.SelectShippingAdressPageModule)
  },
  {
    path: 'OrderConfirmationPage',
    loadChildren: () => import('./order-confirmation/order-confirmation.module').then(m => m.OrderConfirmationPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
