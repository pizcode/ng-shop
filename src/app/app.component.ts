import { Component, OnInit, Output } from '@angular/core';
import { ProductService } from './products/product.service';
import { UserService } from './users/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shopping With Angular';
  theme:boolean = true;
  count:number=0;

  constructor (private PS:ProductService,private US:UserService) {
   this.cartCounts();
  }

  cartCounts(){
    return this.PS.getCartCount().subscribe(i=>{
      this.count = i;
    })
  }

  isLogin(){
    return this.US.isLoggedIn();
  }

  logout(){
    this.US.doLogout();
  }

  changeTheme(){
    this.theme = !this.theme;
  }
}
