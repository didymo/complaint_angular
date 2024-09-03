import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationStepDetailComponent } from './investigation-step-detail.component';

describe('InvestigationStepDetailComponent', () => {
  let component: InvestigationStepDetailComponent;
  let fixture: ComponentFixture<InvestigationStepDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestigationStepDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestigationStepDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
