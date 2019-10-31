import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { loginAnimation } from '../animations';

@Component({
  selector: 'rpa-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css'],
  animations: [loginAnimation],
  encapsulation: ViewEncapsulation.None
})
export class AdminAuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
