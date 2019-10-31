import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignerService } from './services/assigner.service';
import * as moment from 'moment';

@Component({
  selector: 'rpa-delegate-to',
  templateUrl: './delegate-to.component.html',
  styleUrls: ['./delegate-to.component.css']
})
export class DelegateToComponent implements OnInit {

  public delegateForm: FormGroup;
  public nodeName: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private assignerSrv: AssignerService
  ) {
    this.nodeName = this.route.snapshot.queryParams.name;
    this.delegateForm = fb.group({
      delegator_id: this.route.snapshot.queryParams.assigner,
      first_name: '',
      last_name: '',
      delegatee_email: '',
      deadline: '',
      node_id: this.route.snapshot.queryParams.node
    });

  }

  ngOnInit() {
  }

  submit(): void {
    this.delegateForm.value.deadline = moment(this.delegateForm.value.deadline).format('YYYY-MM-DD');
    this.assignerSrv.addDelegatee(this.delegateForm.value)
      .subscribe( res => {
        if(res && res.status === 'Delegation Successful') {
          this.router.navigate(['/graph'])
        }
      });
  }

}
