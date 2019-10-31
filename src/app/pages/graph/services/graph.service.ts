import { Injectable } from '@angular/core';
import { HttpWrapperService } from '../../../shared/services/http-wrapper.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(
    private http: HttpWrapperService
  ) { }

  getOrgChart(): Observable<any> {
    return this.http.get('org-chart/get')
  }

  addNode(params: any): Observable<any> {
    return this.http.post('org-chart/add-node', JSON.stringify(params))
  }

  updateNode(params: {name: string, id: number}): Observable<any> {
    return this.http.post('org-chart/update-node', JSON.stringify(params));
  }

  deleteNode(nodeId: number): Observable<any> {
    return this.http.get('org-chart/delete-node/', nodeId)
  }

  getNodeTypes(): Observable<any> {
    return this.http.get('org-chart/node-types/get');
  }
}
