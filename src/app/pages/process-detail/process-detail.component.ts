import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/internal/operators';
import { ProcessDetailService } from './services/process-detail.service';

@Component({
  selector: 'rpa-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.css']
})
export class ProcessDetailComponent implements OnInit {

  processForm: FormGroup;
  public processData: Array<any> = [];
  private currentNode: number;
  public rpaPossition: number = 0;
  public rpaUpdate: string = '';
  public processUpdate: string = '';
  public nodeName: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private processSrv: ProcessDetailService,
  ) {
    this.processForm = fb.group({});
    this.processForm.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(data => {
        this.sendRequest(data);
      });
  }

  ngOnInit() {
    this.nodeName = this.route.snapshot.queryParams.name;
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id');
          return this.processSrv.getProcessDetail(id);
        })
      )
      .subscribe( res => {
        this.initForm(res);
      });
  }

  initForm(response: any): void {
    this.processData = this.orderProcessData(response['data']);
    this.rpaPossition = response['data'].find(item => item.process_or_rpa_key === 'RPAKey')['key_id'];
    this.buildForm(this.processData);
    this.rpaUpdate = response['rpa_last_update'];
    this.processUpdate = response['process_last_update'];
  }

  buildForm(data: Array<any>): void {
    data.forEach( (d, i) => {
      this.currentNode = d.node_id;
      this.processForm.addControl(d.key_id, new FormControl({value:d.value_set, disabled: !d.key_editable}));
    });
  }

  getControl(key: string): AbstractControl {
    return this.processForm.controls[key];
  }

  sendRequest(formValues: any): void {
    let params = [];

    for(let key in formValues) {
      if(this.processForm.controls[key].dirty) {
        let param = {
          key_id: key,
          node_id: this.currentNode,
          value_set: formValues[key]
        };
        params.push(param);
        this.processForm.controls[key].markAsPristine({onlySelf: true});
      }

    }

    if(params.length) {
      this.processSrv.updateProcessDetail(params)
        .subscribe( res => {
          this.initForm(res);
        }, error => {
        });
    }
  }

  orderProcessData(data): Array<any> {
    let ordered = [];
    const process = data.filter(item => item.process_or_rpa_key !== 'RPAKey');
    const rpa = data.filter(item => item.process_or_rpa_key !== 'ProcessKey');
    return ordered.concat(this.sortByFieldOrder(process), this.sortByFieldOrder(rpa));
  }

  sortByFieldOrder(data: Array<any>): Array<any> {
    return data.sort( (a, b) => {
      if(a.field_order > b.field_order)
        return 1;
      return -1;
    });
  }

}
