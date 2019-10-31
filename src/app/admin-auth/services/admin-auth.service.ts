import { Injectable } from '@angular/core';
import { HttpWrapperService } from '../../shared/services/http-wrapper.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpWrapperService,
  ) { }

  login(email_to: string, email_as: string): Observable<any> {
    return this.http.get<any>('login/send-magic-link/', email_to + '/' + email_as)
  }
}
