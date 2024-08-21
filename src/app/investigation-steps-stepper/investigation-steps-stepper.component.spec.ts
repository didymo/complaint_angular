import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationStepsStepperComponent } from './investigation-steps-stepper.component';

describe('InvestigationStepsStepperComponent', () => {
  let component: InvestigationStepsStepperComponent;
  let fixture: ComponentFixture<InvestigationStepsStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestigationStepsStepperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestigationStepsStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
