import { HttpHandler, HttpInterceptor ,HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: HttpXsrfTokenExtractor,private API:APIService) { }

  headerName = 'X-XSRF-TOKEN';

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<any> {

    // to add Auth token in Api
    const authToken = this.API.authToken;
    req = req.clone({
      setHeaders: {
        Authorization: "Bearer " + authToken,
      }
    });
    // if (req.method === 'GET' || req.method === 'HEAD') {
    //   return next.handle(req);
    // }

    // const token = this.tokenService.getToken() as string;
    // console.log(token);
    // // Be careful not to overwrite an existing header of the same name.
    // if (token !== null && !req.headers.has(this.headerName)) {
    //   req = req.clone({headers: req.headers.set(this.headerName, token)});
    // }
    // return next.handle(req);

    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {
          localStorage.removeItem('ng-token');
      }
      const error = err.error.message || err.statusText;
          return throwError(error);
    }));
  }
}
