import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private location: Location,
  ) { }

  public back(): void {
    this.location.back();
  }
}
