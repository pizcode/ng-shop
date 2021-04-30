import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/shared/api.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private PS: ProductService,private API:APIService) { }

  ordersItems: any;
  orderStatus: any;

  ngOnInit(): void {
    this.orders()
  }

  orders() {
    this.API.get('/order').subscribe(value=>{
        this.ordersItems = value['data'];
        this.orderStatus = !!value['data'];
    });
  }
}
