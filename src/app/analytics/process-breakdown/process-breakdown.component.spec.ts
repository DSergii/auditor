import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessBreakdownComponent } from './process-breakdown.component';

describe('ProcessBreakdownComponent', () => {
  let component: ProcessBreakdownComponent;
  let fixture: ComponentFixture<ProcessBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
