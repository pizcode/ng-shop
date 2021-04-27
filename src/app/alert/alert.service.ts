import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { alert } from './Alert';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  private subject = new Subject<alert>();

  constructor() { 
  }

  getAlert() :Observable<alert>{
    return this.subject.asObservable();
  }

  success(message: string) {
      this.subject.next({'message':message,'className':'bg-success text-light'});
  }

  warn(message:string)
  {
    this.subject.next({'message':message,'className':'bg-dark text-light'});
  }

  error(message: string) {
    this.subject.next({'message':message,'className':'bg-danger text-light'});
  }

  clear() {
    this.subject.next({'message':'','className':''});
  }
}
