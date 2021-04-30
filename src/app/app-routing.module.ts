import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartComponent } from './products/cart/cart.component';
import { ListComponent } from './products/list/list.component';
import { ShowComponent } from './products/show/show.component';
import { LoginComponent } from './users/login/login.component';
import { ProfileComponent } from './users/profile/profile.component';
import { MakeOrderComponent } from './products/make-order/make-order.component';
import { OrdersComponent } from './products/orders/orders.component';
import { RegisterComponent } from './users/register/register.component';

const routes: Routes = [
  {path:'',component:ListComponent},
  {path:'show/:id',component:ShowComponent},
  {path:'cart',canActivate:[AuthGuard],component:CartComponent},
  {path:'place_order',canActivate:[AuthGuard],component:MakeOrderComponent},
  {path:'orders',canActivate:[AuthGuard],component:OrdersComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',canActivate:[AuthGuard],component:ProfileComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
