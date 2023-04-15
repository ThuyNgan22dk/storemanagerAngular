import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailComponent } from './admin/account-detail/account-detail.component';
import { AccountComponent } from './admin/account/account.component';
import { AuthComponent } from './admin/auth/auth.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RoleGuardService } from './_services/role-guard.service';
import { CategoryComponent } from './admin/category/category.component';
import { ProductComponent } from "./admin/product/product.component";
import { OrderComponent } from "./admin/order/order.component";
import { PromotionComponent } from './admin/promotion/promotion.component';
import { ImportGoodComponent } from './admin/import-good/import-good.component';
import { CommentComponent } from './admin/comment/comment.component';

const routes: Routes = [
  {
    path: 'admin',component:DashboardComponent,canActivate: [RoleGuardService],data: {expectedRole: "ROLE_ADMIN"},
    children:[
      {path:"account",component: AccountComponent},
      // {path:"customerUpdate",component: AccountDetailComponent},
      {path:"category",component: CategoryComponent},
      {path:'product',component:ProductComponent},
      {path:'promotion',component:PromotionComponent},
      {path:'comment',component:CommentComponent},
      {path:'order',component:OrderComponent},
      {path:'importGood',component:ImportGoodComponent}
    ]
  },
  {path:'',component:AuthComponent},
  // {path:'',component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
