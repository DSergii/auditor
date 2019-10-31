import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { EventHandlerService } from '../../shared/services/event-handler.service';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { User } from '../../shared/models/user.model';
import { StorageHelper } from '../../shared/helpers/storage-helper';
import { LocationService } from '../../shared/services/location.service';
import { filter } from 'rxjs/internal/operators';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'rpa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userEmail: string = '';
  public activeBackLink: boolean = true;

  constructor(
    private router: Router,
    private eventHandlerSrv: EventHandlerService,
    private userSrv: UserService,
    private locationSrv: LocationService,
  ) { }

  ngOnInit() {

    this.activeBackLink = !this.router.url.includes('dashboard');

    this.router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ).subscribe((res: any) => {
      this.activeBackLink = !this.router.url.includes('dashboard');
    });

    this.userSrv.getUser()
      .subscribe((user: User) => {
        if(user && user.id) {
          this.userEmail = user.email;
          this.eventHandlerSrv.passData(user.organization.name);
          StorageHelper.addToStorage(user, 'user')
        }
      });
  }

  mainPage(): void {
    this.router.navigate(['/dashboard']);
  }

  back(): void {
    this.locationSrv.back();
  }

}
