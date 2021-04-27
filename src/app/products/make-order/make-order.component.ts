import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from '../cart/Cart';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit {

  constructor(private PS:ProductService,private router:Router) { }
  
  cartItems:Cart[] = [];
  count:number=0;

  ngOnInit(): void {
    this.getCartItems();
    this.cartCounts();
  }

  cartCounts(){
    return this.PS.getCartCount().subscribe(i=>{
      this.count = i;
    })
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

  orderForms = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl('')
  });

  getCartItems()
  {
    this.cartItems = this.PS.getCartItems()
  }

  saveOrder(data)
  {
    this.PS.makeOrder(data);
    this.router.navigate(['/orders']);
  }

}
