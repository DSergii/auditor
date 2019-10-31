import { Component, ViewEncapsulation } from '@angular/core';
import { loginAnimation } from '../animations';

@Component({
  selector: 'rpa-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [loginAnimation],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent {

  public wrongEmail: string = '';

}
