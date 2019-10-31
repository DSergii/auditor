import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpWrapperService
  ) { }

  getUser(): Observable<any> {
    return this.http.get('org-chart/user/get')
  }

  getLocation(orgId: number): Observable<any> {
    return this.http.get('org-chart/get-locations/', orgId);
  }

  updateUser(params): Observable<any> {
    return this.http.post('org-chart/user/post', JSON.stringify(params));
  }
}
