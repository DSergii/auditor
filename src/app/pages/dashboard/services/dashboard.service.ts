import { Injectable } from '@angular/core';
import { HttpWrapperService } from '../../../shared/services/http-wrapper.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpWrapperService
  ) { }

  getDelegateeStatus(): Observable<any> {
    return this.http.get('delegation/get-delegatee-status');
  }

  emailDelegatee(params: any): Observable<any> {
    return this.http.post('delegation/email-delegatee', JSON.stringify(params));
  }

  deleteDelegatee(params: any): Observable<any> {
    return this.http.post('delegation/delete-delegatee', JSON.stringify(params));
  }
}
