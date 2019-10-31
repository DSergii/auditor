import { Injectable } from '@angular/core';
import { HttpWrapperService } from '../../../shared/services/http-wrapper.service';
import { Observable } from 'rxjs';
import { Delegatee } from '../models/delegatee.model';

@Injectable({
  providedIn: 'root'
})
export class AssignerService {

  constructor(
    private http: HttpWrapperService
  ) { }

  addDelegatee(params: Delegatee): Observable<any> {
    return this.http.post('delegation/add-delegatee', JSON.stringify(params));
  }
}
