import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { InvestigationService } from '../../../_services/investigation.service';
import { ListOfInvestigation } from '../../../_classes/list-of-investigations';

@Component({
  selector: 'app-add-report-dialog',
  standalone: true,
  imports: [MatFormField, ReactiveFormsModule,
    MatDialogModule, CommonModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './add-report-dialog.component.html',
  styleUrl: './add-report-dialog.component.scss'
})
export class AddReportDialogComponent implements OnInit {

  form: FormGroup;
  investigationId: InvestigationId[] = [];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddReportDialogComponent>, private investigationService: InvestigationService) {
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
    this.dialogRef.close();
    this.form.reset();
  }

  save(): void {
    if (this.form.valid) {
      console.log(this.form.value)
      this.dialogRef.close(this.form.value);
    } else {

    }

  }
}

interface InvestigationId {
  value: number;
  label: string;
}

