import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class HttpWrapperService {

  private API_URL = environment.API_URL;
  private prefix_api = environment.prefix_api;

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }


  post<T>(endpoint: string, item: any): Observable<T> {
    this.spinner.show();
    return new Observable((observer: Observer<T>) => {
      this.http.post(this.API_URL + this.prefix_api + endpoint, item, )
        .subscribe((response: any) => {
            observer.next(response);
            observer.complete();
            this.spinner.hide();
          },
          (error: Response) => {
            this.checkAuthError(error);
            observer.error(error);
            this.spinner.hide();
          }
        );
    });
  }

  get<T>(endpoint: string, item?: any): Observable<T> {
    this.spinner.show();
    return new Observable((observer: Observer<T>) => {
      this.http.get(this.API_URL + this.prefix_api + endpoint + `${item ? item : ''}` )
        .subscribe((response: any) => {
            observer.next(response);
            observer.complete();
            this.spinner.hide();
          },
          (error: Response) => {
            this.checkAuthError(error);
            observer.error(error);
            this.spinner.hide();
          }
        );
    });
  }

  checkAuthError(error: Response): void {
    if(error.status == 403) {
      this.router.navigate(['/login']);
    }
  }

}
