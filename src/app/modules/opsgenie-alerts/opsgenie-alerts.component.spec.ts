import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsgenieAlertsComponent } from './opsgenie-alerts.component';

describe('OpsgenieAlertsComponent', () => {
  let component: OpsgenieAlertsComponent;
  let fixture: ComponentFixture<OpsgenieAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsgenieAlertsComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsgenieAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
