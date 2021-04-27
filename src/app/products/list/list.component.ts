import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private PS:ProductService,private router:Router) { }
  lists = [];
  ngOnInit() {
    this.PS.getProducts().subscribe(value=>{
      this.lists = value['data'];
    });
  }

  show(id:number)
  {
    this.router.navigate(["/show/"+id]);
  }
  addToCart(id)
  {
    // this.PS.addToCart(id);
  }


}
