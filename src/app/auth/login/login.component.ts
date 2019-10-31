import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { StorageHelper } from '../../shared/helpers/storage-helper';
import { loginAnimation } from '../../animations';

@Component({
  selector: 'rpa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [loginAnimation],
})
export class LoginComponent implements OnInit {


  @Output() wrongEmail: EventEmitter<string> = new EventEmitter<string>();
  public loginForm: FormGroup;
  public successEmailSent: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.required]
    });
  }

  ngOnInit() {
    StorageHelper.removeFromStorage('token');
    StorageHelper.removeFromStorage('user');
  }

  login(): void {
    this.auth.login(this.loginForm.value['email'])
      .subscribe( res => {
        if(res) {
          this.successEmailSent = true;
        }
      }, error => {
        if(error.status == 401 ) {
          this.wrongEmail.emit(this.loginForm.value['email']);
        }
      });
  }

}
