import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpaAnalyzerComponent } from './rpa-analyzer.component';

describe('RpaAnalyzerComponent', () => {
  let component: RpaAnalyzerComponent;
  let fixture: ComponentFixture<RpaAnalyzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpaAnalyzerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpaAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
