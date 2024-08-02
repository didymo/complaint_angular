import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { InvestigationService } from '../../../_services/investigation.service';
import { ListOfInvestigation } from '../../../_classes/list-of-investigations';

@Component({
  selector: 'app-duplicate-report-dialog',
  templateUrl: './duplicate-report-dialog.component.html',
  imports: [MatFormField, ReactiveFormsModule,
    MatDialogModule, CommonModule, MatInputModule, MatButtonModule, MatSelectModule],
  standalone: true,
  styleUrls: ['./duplicate-report-dialog.component.scss']
})
export class DuplicateReportDialogComponent implements OnInit {

  form: FormGroup;
  investigationId: InvestigationId[] = [];

  constructor( private fb: FormBuilder, public dialogRef: MatDialogRef<DuplicateReportDialogComponent>, private investigationService: InvestigationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data.report.json_string)
    console.log(this.data)
    this.form = this.fb.group({
      label: [''],
      investigation_id: ['']
    });
  }

  ngOnInit(): void {
    this.investigationService.getInvestigationList().subscribe((investigations: ListOfInvestigation[]) => {
      this.investigationId = investigations.map(investigation => ({
        value: investigation.entityId,
        label: investigation.label
      }));
    });
  }

  close(): void {
    this.dialogRef.close(null);
    this.form.reset();
    }

  onSave(): void {
    if (this.form.valid) {
      const updatedReport = {
        ...this.data,
        label: this.form.value.label,
        investigation_id: this.form.value.investigation_id,
        json_string: this.data.report.json_string

      };
      this.dialogRef.close(updatedReport);
    }
  }
}

interface InvestigationId {
  value: number;
  label: string;
}