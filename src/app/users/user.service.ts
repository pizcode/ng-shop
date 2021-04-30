import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { APIService } from '../shared/api.service';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://localhost/angular-app/api';

  constructor(
    private routes: Router,
    private API: APIService,
    private alert: AlertService,
  ) { }

  login(input) {
     this.API.csrf('/sanctum/csrf-cookie').subscribe(()=>{
      const res = this.API.post('/login', input);
      this.process(res);
     });
  }

  register(input) {
    const res = this.API.post('/register', input);
    this.process(res);
  }

  process(res){
    res.subscribe(value => {
      if (value['success']) {
        localStorage.setItem('ng-token',value['data'].token);
        this.alert.success(value['message']);
        this.routes.navigate(['/profile']);
      }
      this.alert.success(value['message']);
      return value;
    });
  }

  getLoginUser() {
    return this.API.get('/current/user');
  }

  isLoggedIn(): Boolean {
    return !!localStorage.getItem('ng-token');
  }

  doLogout(): void {
    this.API.post('/logout').subscribe(value=>{
      this.alert.success(value['message']);
      this.routes.navigate(['/login']);
      localStorage.removeItem('ng-token');
    });
  }

}
