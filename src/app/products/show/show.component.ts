import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(private route:ActivatedRoute,private PS:ProductService) { }

  show:Product;
  selectedId:number;

  ngOnInit() {
    let id:number = this.route.snapshot.params.id;
    this.PS.getProduct(id).subscribe(value=>{
      this.show = value['data'];
    });
  }
  addToCart(id)
  {
    this.PS.addToCart(id)
  }

}
