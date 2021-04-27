import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { CartComponent } from './cart/cart.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MakeOrderComponent } from './make-order/make-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ListComponent,
    ShowComponent,
    CartComponent,
    MakeOrderComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports:[MatButtonModule]
})
export class ProductsModule { }
