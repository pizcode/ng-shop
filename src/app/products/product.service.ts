import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { APIService } from '../shared/api.service';
import { Cart } from './cart/Cart';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl: string = "https://localhost/angular-app/api/product";
  private products: Product[] = [];
  private carts: Cart[] = [];
  private orders: Cart[] = [];
  private userOrder;

  private count = new BehaviorSubject<any>(0);

  constructor(
    private AS: AlertService,
    private _https: HttpClient,
    private API: APIService
  ) {
    // this.addToCart(3);
    // this.addToCart(1);
    this.doCount();
  }

  get totalCount() {
    const total = this.carts.reduce((acc, item) => {
      acc.total += item.quantity * item.price;
      return acc;
    }, {
      total: 0
    });
    return total;
  }

  // get totalCount(){

  // }

  getUserOrder() {
    return this.userOrder;
  }

  getOrders() {
    return this.orders;
  }

  // makeOrder(data) {
  //   this.userOrder = data;
  //   this.orders = this.carts;
  //   this.carts = [];
  //   this.AS.warn('Order placed successfully');
  //   this.doCount();
  // }

  makeOrder(data) {
    this.API.post('/order',data).subscribe(value=>{
      this.AS.warn(value['message']);
      this.doCount();
    });
  }



  doCount() {
    this.API.post('/carts/count').subscribe(value => {
      return this.count.next(value['data']);
    });
  }

  // get doCount() {
  //   var count: number = 0;
  //   this.carts.every(i => {
  //     count += i.quantity
  //     return true;
  //   })
  //   return count;
  // }



  getCartCount() {
    return this.count.asObservable();
  }

  updateQuantity(id, qty) {
    return this.API.put('/cart', id, { 'quantity': qty });
  }
  // updateQuantity(id, qty) {
  //   this.carts.find(i => i.id == id).quantity += qty;
  //   this.doCount();
  // }

  getProduct(id) {
    return this._https.get(this.productUrl + '/' + id);
  }

  removeFromCart(id = 0) {
    return this.API.delete('/cart', id).subscribe(value => {
      this.AS.warn(value['message']);
      this.doCount();
      return value;
    });
  }


  // addToCart(id){
  //   const data = this.getProduct(id)
  //   this.carts.push({
  //     id: Math.round(Math.random()*100000),
  //     product_id:data.id,
  //     price:data.price,
  //     title:data.title,
  //     image:data.image,
  //     quantity:1
  //   });
  //   this.AS.warn('Item Added to cart');
  //   this.doCount();
  // }

  addToCart(data) {
    return this.API.post('/cart', { 'pid': data }).subscribe(value => {
      this.AS.warn(value['message']);
      this.doCount();
    });
  }

  getCartItems() {
    return this.API.get('/cart');
  }

  getProducts() {
    return this.API.get('/product');
  }
}