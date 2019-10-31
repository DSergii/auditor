import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageHelper } from '../helpers/storage-helper';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = StorageHelper.getFromStorage('token');
    let headers;

    if(token) {
      headers = new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      });
    } else {
      headers = new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest'
      });
    }
    request = request.clone({headers: headers});

    return next.handle(request);
  }
}
