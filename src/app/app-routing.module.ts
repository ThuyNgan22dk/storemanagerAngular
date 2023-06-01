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
// import { CommentComponent } from './admin/comment/comment.component';
import { CartComponent } from './client/cart/cart.component';
import { UserProfileComponent } from './client/user-profile/user-profile.component';
import { HomeComponent } from './client/home/home.component';
import { SearchComponent } from './client/search/search.component';
import { ProductDetailComponent } from './client/product-detail/product-detail.component';
import { CheckOutComponent } from './client/check-out/check-out.component';
import { MyOrderComponent } from './client/my-order/my-order.component';
import { OrderDetailComponent } from './admin/order-detail/order-detail.component';
import { ImportDetailComponent } from './admin/import-detail/import-detail.component';
import { IndexComponent } from './client/index/index.component';
import { ShopComponent } from './client/shop/shop.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { WarehouseComponent } from './admin/warehouse/warehouse.component';

const routes: Routes = [
  {
    path: 'admin',component:DashboardComponent,canActivate: [RoleGuardService],data: {expectedRole: "ROLE_ADMIN"},
    children:[
      {path:"account",component: AccountComponent},
      {path:"category",component: CategoryComponent},
      {path:'',component: WarehouseComponent},
      {path:'product',component:ProductComponent},
      {path:'promotion',component:PromotionComponent},
      {path:'order',component:OrderComponent},
      {path:'order/orderDetail/:id',component:OrderDetailComponent},
      {path:'importGood',component:ImportGoodComponent},
      {path:'import/importDetail/:id',component:ImportDetailComponent}
    ]
  },
  {
    path: '',component:IndexComponent,
    children:[
      {path:"cart",component: CartComponent,canActivate: [AuthGuardService]},
      {path:"userDetail",component: UserProfileComponent,canActivate: [AuthGuardService]},
      {path:'productDetail/:id',component:ProductDetailComponent},
      {path:'checkout',component:CheckOutComponent,canActivate: [AuthGuardService]},
      {path:'myOrder',component:UserProfileComponent,canActivate: [AuthGuardService]},
      {path:'',component:HomeComponent},
      {path:'shop',component:ShopComponent,},
      {path:"search/:keyword",component: ShopComponent},
      {path:'category/:id',component:ShopComponent},
    ]
  },
  {path:'auth',component:AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
