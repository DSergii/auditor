import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCostsComponent } from './resource-costs.component';

describe('ResourceCostsComponent', () => {
  let component: ResourceCostsComponent;
  let fixture: ComponentFixture<ResourceCostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceCostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
