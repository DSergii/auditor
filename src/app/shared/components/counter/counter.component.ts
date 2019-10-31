import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTER_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CounterComponent),
  multi: true
};

@Component({
  selector: 'rpa-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  providers: [COUNTER_CONTROL_ACCESSOR]
})
export class CounterComponent implements ControlValueAccessor {
  private counter: ElementRef;
  private hours: ElementRef;
  private mins: ElementRef;

  private onTouch: Function;
  private onModelChange: Function;

  @ViewChild('counter', {static: false}) set _counter(counter:ElementRef) {
    if(counter) {
      this.counter = counter;
      this.counter.nativeElement.value = this.value;
    }
  }
  @ViewChild('hours', {static: false}) set _hours(hour:ElementRef) {
    if(hour) {
      this.hours = hour;
      this.hours.nativeElement.value = Math.trunc(this.value/60);
    }
  }
  @ViewChild('minutes', {static: false}) set _mins(min:ElementRef) {
    if(min) {
      this.mins = min;
      this.mins.nativeElement.value = this.value%60;
    }
  }

  @Input() type: string;
  @Input() disable: boolean;
  private cashedValue: number = 0;
  private value: number = 0;

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  writeValue(value: any) {
    this.value = value;
  }

  increase(timeType: string): void {
    if(!this.disable) {
      if(this.type) {
        if(timeType === 'h') {
          this.hours.nativeElement.value = parseInt(this.hours.nativeElement.value) + 1;
          this.cashedValue = (parseInt(this.hours.nativeElement.value) * 60) + parseInt(this.mins.nativeElement.value);
        } else {
          this.mins.nativeElement.value = parseInt(this.mins.nativeElement.value) + 1;
          this.cashedValue = (parseInt(this.hours.nativeElement.value) * 60) + parseInt(this.mins.nativeElement.value);
        }
        this.onModelChange(this.cashedValue);
      } else {
        if(!this.counter.nativeElement.value) {
          this.counter.nativeElement.value = 1;
        } else {
          this.counter.nativeElement.value = parseInt(this.counter.nativeElement.value) + 1;
        }
        this.onModelChange(this.counter.nativeElement.value);
      }

      this.onTouch();
    }
  }

  decrease(timeType: string): void {
    if(!this.disable) {
      if (this.type) {
        if (timeType === 'h') {
          this.hours.nativeElement.value = parseInt(this.hours.nativeElement.value) - 1;
          this.cashedValue = (parseInt(this.hours.nativeElement.value) * 60) + parseInt(this.mins.nativeElement.value);
        } else {
          this.mins.nativeElement.value = parseInt(this.mins.nativeElement.value) - 1;
          this.cashedValue = (parseInt(this.hours.nativeElement.value) * 60) + parseInt(this.mins.nativeElement.value);
        }
        this.onModelChange(this.cashedValue);
      } else {
        if (this.counter.nativeElement.value != 0) {
          this.counter.nativeElement.value = parseInt(this.counter.nativeElement.value) - 1;
          this.onModelChange(this.counter.nativeElement.value);
        }
      }
      this.onTouch();
    }
  }

  update(): void {
    if(this.type) {
      const time = (parseInt(this.hours.nativeElement.value) * 60) + parseInt(this.mins.nativeElement.value);
      this.onModelChange(time);
    } else {
      this.onModelChange(this.counter.nativeElement.value);
    }
    this.onTouch();
  }

}
