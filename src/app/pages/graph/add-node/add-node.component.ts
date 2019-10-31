import { Component, HostListener, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'rpa-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})
export class AddNodeComponent implements OnInit {

  public onClose: Subject<any>;
  public nodeForm: FormGroup;
  public type: string;
  public nodeType: string;
  private name: string;

  @HostListener('window:keyup.enter', ['$event'])
  enterBtnEvent(event) {
    this.onClose.next(this.nodeForm.value.name);
    this.bsModalRef.hide();
  }

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder
  ) {
    this.nodeForm = fb.group({
      name: '',
    });
  }

  ngOnInit() {
    this.onClose = new Subject();
    if(this.type === 'edit') {
      this.nodeForm.get('name').setValue(this.name);
    }
  }

  addNode(): void {
    this.onClose.next(this.nodeForm.value.name);
    this.bsModalRef.hide();
  }

}
