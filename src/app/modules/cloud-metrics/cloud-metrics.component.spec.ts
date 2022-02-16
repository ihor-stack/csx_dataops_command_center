import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudMetricsComponent } from './cloud-metrics.component';

describe('CloudMetricsComponent', () => {
  let component: CloudMetricsComponent;
  let fixture: ComponentFixture<CloudMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloudMetricsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
