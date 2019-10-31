import { Component } from '@angular/core';
import { map } from 'rxjs/internal/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageHelper } from '../shared/helpers/storage-helper';

@Component({
  selector: 'rpa-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {

    this.route.queryParamMap.pipe(
      map((params: any) => {
        if(params.params && params.params['url_auth_token']) {
          StorageHelper.addToStorage(params.params['url_auth_token'],'token');
        }
      })
    ).subscribe();
  }
}