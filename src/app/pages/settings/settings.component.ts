import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageHelper } from '../../shared/helpers/storage-helper';
import { Observable } from 'rxjs';
import { UserService } from '../../shared/services/user.service';

/**
 * models
 */
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'rpa-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public settingsForm: FormGroup;
  public user: User = StorageHelper.getFromStorage('user');
  public location$: Observable<any>;

  constructor(
    private userSrv: UserService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.settingsForm = fb.group({
      first_name: '',
      last_name: '',
      location_id: ''
    });
  }

  ngOnInit() {
    this.userSrv.getUser()
      .subscribe((user: User) => {
        if(user && user.id) {
          this.user = user;
          this.setUserSettings(user);
          StorageHelper.addToStorage(user, 'user')
        }
      });
    this.location$ = this.userSrv.getLocation(this.user.organization.id)
  }

  setUserSettings(user: User): void {
    this.settingsForm.get('first_name').patchValue(user.first_name);
    this.settingsForm.get('last_name').patchValue(user.last_name);
    this.settingsForm.get('location_id').patchValue(user.location.id);
  }

  updateUser(): void {
    this.userSrv.updateUser(this.settingsForm.value)
      .subscribe( user => {
        if(user.status === 'User successfuly updated') {
          this.router.navigate(['/dashboard'])
        }
      });
  }

}
