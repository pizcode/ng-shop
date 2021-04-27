import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Cart } from './Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private PS:ProductService,private router:Router) { }
  
  cartItems:Cart[] = [];

  ngOnInit(): void {
    this.getCartItems();
  }

  get totalCount() {
    const total = this.cartItems.reduce((acc, item) => {
      acc.total += item.quantity*item.price;
      return acc;
    }, {
      total:0
    });
    return total;
  }

  updateQty(id,qty){
    this.PS.updateQuantity(id,qty);
  }

  getCartItems()
  {
    this.cartItems = this.PS.getCartItems()
  }

  show(id:number)
  {
    this.router.navigate(["/show/"+id]);
  }
  home()
  {
    this.router.navigate(["/"]);
  }
  order()
  {
    this.router.navigate(["place_order"]);
  }
  remove(id?)
  {
    this.PS.removeFromCart(id);
  }

}
