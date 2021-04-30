import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/component/dialog/dialog.service';
import { ProductService } from '../product.service';
import { Cart } from './Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private PS: ProductService,
    private router: Router,
    private dialog: DialogService) { }

  cartItems: Cart[] = [];

  ngOnInit(): void {
    this.getCartItems();
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

  updateQty(id, qty) {
    this.PS.updateQuantity(id, qty).subscribe(value => {
      this.cartItems.find(i => i.id == id).quantity = value['data'];
      this.PS.doCount();
    });
  }

  getCartItems() {
    this.PS.getCartItems().subscribe(value => {
      this.cartItems = value['data'];
    });
  }

  show(id: number) {
    this.router.navigate(["/show/" + id]);
  }
  home() {
    this.router.navigate(["/"]);
  }
  order() {
    this.router.navigate(["place_order"]);
  }
  remove(id) {
    this.confirmDialog().then(() => {
      this.PS.removeFromCart(id).add(() => {
        this.getCartItems();
      })
    })
  }

  confirmDialog() {
    const options = {
      title: 'Remove Item',
      message: 'Are you sure you want to remove Item?',
      cancelText: 'No',
      confirmText: 'Yes'
    };
    this.dialog.open(options);
    return new Promise((resolve) => {
      this.dialog.confirmed().subscribe(confirmed => {
        if (confirmed) {
          resolve(confirmed)
        }
      });
    })
  }

}
