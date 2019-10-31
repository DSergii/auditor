import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventHandlerService {

  private _subject: Subject<any> = new Subject<any>();
  $ = this._subject.asObservable();

  constructor() { }

  passData(data: any): any {
    this._subject.next(data);
    this._subject.complete();
  }
}
