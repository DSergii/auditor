import { Component, OnInit } from '@angular/core';
import { ResourceCostService } from './services/resource-cost.service';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/internal/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'rpa-resource-costs',
  templateUrl: './resource-costs.component.html',
  styleUrls: ['./resource-costs.component.css']
})
export class ResourceCostsComponent implements OnInit {

  public tableFieldDict = {
    annual_cost: 'Annual Cost',
    hours_per_day: 'Hours / Day',
    days_per_week: 'Days / Week',
    hours_per_year: 'Hours / Year',
    days_per_year: 'Days / Year',
    head_count: 'Headcount'
  };
  public resourceCostForm: FormGroup;
  public title: string;

  constructor(
    private resourceSrv: ResourceCostService,
    private route: ActivatedRoute,
    private fb: FormBuilder,

  ) {
    this.resourceCostForm = this.fb.group({
      annual_cost: '',
      hours_per_day: '',
      days_per_week: '',
      hours_per_year: '',
      days_per_year: '',
      head_count: '',
    });
    this.resourceCostForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(data => {
        this.resourceSrv.updateResourceCost(data)
          .subscribe( res => {
          }, error => {

          });
      });
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id');
          return this.resourceSrv.getResourceCost(id);
        })
      )
      .subscribe( res => {
        this.formInit(res['data']);
        this.title = res.page_title;
      }, error => {
      });
  }

  formInit(data: any): void {
    for(let key in data) {
      if(data.hasOwnProperty(key)) {
        if(this.resourceCostForm.get(key) ) {
          this.resourceCostForm.get(key).setValue(data[key]);
        }
      }
    }
    this.resourceCostForm.addControl('node', new FormControl(data['node_id']));
    this.resourceCostForm.addControl('fte_or_rpa', new FormControl(data['fte_or_rpa']));
  }

}
