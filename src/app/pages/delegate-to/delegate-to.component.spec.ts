import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateToComponent } from './delegate-to.component';

describe('DelegateToComponent', () => {
  let component: DelegateToComponent;
  let fixture: ComponentFixture<DelegateToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegateToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegateToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
