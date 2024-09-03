import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewInvestigationStepsComponent } from './preview-investigation-steps.component';

describe('PreviewInvestigationStepsComponent', () => {
  let component: PreviewInvestigationStepsComponent;
  let fixture: ComponentFixture<PreviewInvestigationStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewInvestigationStepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewInvestigationStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
