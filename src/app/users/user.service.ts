import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://localhost/angular-app/api';

  constructor(private routes:Router,private alert:AlertService,private http:HttpClient) { }

  // save(data):boolean{
  //   const user = this.getUsers().filter(i => i.email == data.email && i.password == data.password);
  //   const flag = user.length;
  //   if(flag==1)
  //   {
  //     localStorage.setItem('ng-token',user[0].email);
  //     this.alert.success("Login successful");
  //     this.routes.navigate(['/profile']);
  //     return true;
  //   }
  //   this.alert.error("Invalid email or password");
  //   return false;
  // }

  login(input)
  {
      const res = this.http.post(this.url+'/login',input);
      res.subscribe(value=>{
        if(value['success'])
        {
          localStorage.setItem('ng-token',value['data'].email);
          this.alert.success(value['message']);
          this.routes.navigate(['/profile']);
        }
        this.alert.success(value['message']);
        return value;
      });
  }

  register(input)
  {
    const res = this.http.post(this.url+'/register',input);
      res.subscribe(value=>{
        if(value['success'])
        {
          // localStorage.setItem('ng-token',value['data'].email);
          this.alert.success(value['message']);
          this.routes.navigate(['/profile']);
        }
        this.alert.success(value['message']);
        return value;
    });
  }

  getLoginUser():User{
    let email = localStorage.getItem('ng-token');
    return this.getUsers().find(i => i.email == email);
  }

  isLoggedIn():Boolean{
    return !!localStorage.getItem('ng-token');
  }

  doLogout():void{
    localStorage.removeItem('ng-token');
    this.alert.success("successfully Logout");
    this.routes.navigate(['/login']);
  }

  Users()
  {
    return this.http.get(this.url+'/user');
  }

  getUsers():User[]{
   
    return[
      {
        id:1,
        name:'priyank',
        image:'https://picsum.photos/id/1011/200/300',
        email:'priyank@gmail.com',
        password:'123456789'
      },{
        id:2,
        name:'admin',
        image:'https://picsum.photos/id/1005/200/300',
        email:'admin@gmail.com',
        password:'123456789'
      }
    ];
  }

}
