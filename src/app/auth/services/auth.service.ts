import { Injectable } from '@angular/core';
import { HttpWrapperService } from '../../shared/services/http-wrapper.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpWrapperService
  ) { }

  login(email: string): Observable<any> {
    return this.http.get<any>('login/send-magic-link/', email)
  }
}
