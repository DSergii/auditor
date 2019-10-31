import { Injectable } from '@angular/core';
import { HttpWrapperService } from '../../../shared/services/http-wrapper.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceCostService {

  constructor(
    private http: HttpWrapperService
  ) {}

  getResourceCost(nodeId: string): Observable<any> {
    return this.http.get('process/get-resource-cost/', nodeId)
  }

  updateResourceCost(params: any): Observable<any> {
    return this.http.post('process/update-resource-cost', JSON.stringify(params));
  }

}