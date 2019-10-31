import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/admin-auth.service';
import { StorageHelper } from '../../shared/helpers/storage-helper';

@Component({
  selector: 'rpa-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() wrongEmail: EventEmitter<boolean> = new EventEmitter<boolean>();
  public loginForm: FormGroup;
  public successEmailSent: boolean = false;  

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.loginForm = fb.group({
      email_to: ['', Validators.required],
      email_as: ['', Validators.required]
    });
  }

  ngOnInit() {
    StorageHelper.removeFromStorage('token');
    StorageHelper.removeFromStorage('user');
  }

  login(): void {
    this.auth.login(this.loginForm.value['email_to'], this.loginForm.value['email_as'])
      .subscribe(res => {
        if(res) {
          this.successEmailSent = true;
        }
      }, error => {
        if(error.status == 401 ) {
          this.wrongEmail.emit(true);
        }
      });
  }

}
