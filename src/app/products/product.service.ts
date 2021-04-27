import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { Cart } from './cart/Cart';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url:string = "https://localhost/angular-app/api/product";
  private products = [];
  private carts: Cart[] = [];
  private orders: Cart[] = [];
  private userOrder;

  private count = new BehaviorSubject<number>(0);

  constructor(private AS:AlertService,private _https:HttpClient) {
    // this.addToCart(3);
    // this.addToCart(1);
   }

   get totalCount() {
    const total = this.carts.reduce((acc, item) => {
      acc.total += item.quantity*item.price;
      return acc;
    }, {
      total:0
    });
    return total;
  }

   getUserOrder()
  {
    return this.userOrder;
  }

  getOrders()
  {
    return this.orders;
  }

  makeOrder(data)
  {
    this.userOrder = data;
    this.orders = this.carts;
    this.carts = [];
    this.AS.warn('Order placed successfully');
    this.count.next(this.doCount);
  }

   get doCount(){
     var count:number = 0;
      this.carts.every(i=> {
        count += i.quantity
        return true;
      })
      return count; 
   }

   getCartCount(){
    return this.count.asObservable();
  }
  updateQuantity(id,qty)
  {
    this.carts.find(i=>i.id == id).quantity += qty;
    this.count.next(this.doCount);
  }

  getProduct(id){
    return this._https.get(this.url+'/'+id);
  }

  removeFromCart(id=0){

    if(id==0){
      this.carts.splice(0,this.carts.length);
      this.AS.warn('All Items removed from cart');
      this.count.next(this.doCount);
      return true;
    }
    const requiredIndex = this.carts.findIndex(el => el.id === id);
    if(requiredIndex === -1){
      return false;
    };
    this.carts.splice(requiredIndex, 1);
    this.AS.warn('Item removed from cart');
    this.count.next(this.doCount);
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
  //   this.count.next(this.doCount);
  // }

  getCartItems()
  {
    return this.carts;
  }

  getProducts(){
    return this._https.get(this.url);
  }
}