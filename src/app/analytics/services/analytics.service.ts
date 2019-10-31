import { Injectable } from '@angular/core';
import { HttpWrapperService } from '../../shared/services/http-wrapper.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(
    private http: HttpWrapperService
  ) { }

  getAuditAnalytics(): Observable<any> {
    return this.http.get('analytics/get-dept-audit-status');
  }

  getRPAAnalysis(): Observable<any> {
    return this.http.get('analytics/get-rpa-analysis');
  }
}
