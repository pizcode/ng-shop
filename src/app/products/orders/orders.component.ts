import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private PS:ProductService) { }

  ordersItem:any;
  usersOrder:any;
  orderStatus:any;

  ngOnInit(): void {
    this.orders() 
  }

  orders(){
    this.ordersItem = this.PS.getOrders();
    this.usersOrder = this.PS.getUserOrder();
    this.orderStatus = !!this.ordersItem.length;
  }
}
