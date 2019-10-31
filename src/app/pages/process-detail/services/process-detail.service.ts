import { Injectable } from '@angular/core';
import { HttpWrapperService } from '../../../shared/services/http-wrapper.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessDetailService {

  constructor(
    private http: HttpWrapperService
  ) { }

  getProcessDetail(id: string): Observable<any> {
    return this.http.get('process/get/', id);
  }

  updateProcessDetail(params: any): Observable<any> {
    return this.http.post('process/post', JSON.stringify(params));
  }
}
