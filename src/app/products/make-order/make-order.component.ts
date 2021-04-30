import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from '../cart/Cart';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit {

  constructor(private PS: ProductService, private router: Router) { }

  cartItems: Cart[] = [];
  count: number = 0;

  orderForms = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.getCartItems();
    this.cartCounts();
  }

  cartCounts() {
    return this.PS.getCartCount().subscribe(i => {
      this.count = i;
    })
  }

  get totalCount() {
    const total = this.cartItems.reduce((acc, item) => {
      acc.total += item.quantity * item.price;
      return acc;
    }, {
      total: 0
    });
    return total;
  }

  getCartItems() {
    this.PS.getCartItems().subscribe(value => {
      this.cartItems = value['data'];
    })
  }

  saveOrder(data) {
    if (this.orderForms.valid) {
      this.PS.makeOrder(data);
      this.router.navigate(['/orders']);
    }
  }

}
