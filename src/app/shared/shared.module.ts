import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CounterComponent } from './components/counter/counter.component';
import { OnlynumberDirective } from './directives/onlynumber.directive';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ColorLabelPipe } from './pipes/color-label.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutofocusDirective } from './directives/autofocus.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    NgSelectModule,
  ],
  declarations: [
    CounterComponent,
    OnlynumberDirective,
    ColorLabelPipe,
    AutofocusDirective,
  ],
  entryComponents: [
    CounterComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CounterComponent,
    OnlynumberDirective,
    BsDatepickerModule,
    HttpClientModule,
    ToastrModule,
    ModalModule,
    ColorLabelPipe,
    NgSelectModule,
    AutofocusDirective,
  ]
})
export class SharedModule { }
