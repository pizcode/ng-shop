import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  constructor(private https: HttpClient) { }

  private endpoint: string = "//localhost/angular-app/api";
  private endpoint1: string = "//localhost/angular-app";
  private httpOptions = new HttpHeaders().set('Content-Type', 'application/json');
  csrf(url) {
    return this.https.get(this.endpoint1 + url, { headers: this.httpOptions }).pipe(
      catchError(this.handleError)
    );
  }

  get(url, data?) {
    return this.https.get(this.endpoint + url, { headers: this.httpOptions, params: data }).pipe(
      catchError(this.handleError)
    );
  }
  post(url, data?) {
    return this.https.post(this.endpoint + url, data, { headers: this.httpOptions });
  }

  put(url, id, data) {
    return this.https.put(this.endpoint + url + `/${id}`, data, { headers: this.httpOptions });
  }
  delete(url, id) {
    return this.https.delete(this.endpoint + url + `/${id}`, { headers: this.httpOptions });
  }

  get authToken() {
    return localStorage.getItem('ng-token');
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}