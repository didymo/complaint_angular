import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateReportDialogComponent } from './duplicate-report-dialog.component';

describe('DuplicateReportDialogComponent', () => {
  let component: DuplicateReportDialogComponent;
  let fixture: ComponentFixture<DuplicateReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuplicateReportDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplicateReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
