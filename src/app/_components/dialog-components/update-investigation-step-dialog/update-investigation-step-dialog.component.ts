import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, FormsModule  } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { StepChoice } from '../../../_classes/step-choice';
import { Step } from '../../../_classes/step';
import { UuidService } from '../../../_services/uuid.service';
@Component({
  selector: 'app-update-investigation-step-dialog',
  standalone: true,
  imports: [MatFormField, ReactiveFormsModule,
    MatDialogModule, CommonModule,MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule],
  templateUrl: './update-investigation-step-dialog.component.html',
  styleUrl: './update-investigation-step-dialog.component.scss'
})
export class UpdateInvestigationStepDialogComponent {
  formData: any = {
    description: '',
    required: '',
    displayType: '',
    choices: [],
    conditions: []
  };
  filteredStepsData: Step[] = [];
  displayType: DisplayType[] = [
    { value: 'radio', label: 'Radio' },
    { value: 'radio&text', label: 'Radio & Text' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'checkbox&text', label: 'Checkbox & Text' },
    { value: 'textbox', label: 'Textbox' }
  ];

  constructor(
    private uuidService: UuidService,
    public dialogRef: MatDialogRef<UpdateInvestigationStepDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { step: any; stepsData: Step[] }
  ) {
    this.formData.description = data.step.description;
    this.formData.required = data.step.required;
    this.formData.displayType = data.step.displayType;
    this.formData.choices = data.step.choices || [];
    this.formData.conditions = data.step.conditions || [];
    this.filteredStepsData = data.stepsData.filter(s => s.stepUuid !== data.step.stepUuid);
  }

  addChoice() {
    this.formData.choices.push({
      id: this.formData.choices.length + 1,
      choiceUuid: this.uuidService.generateUuid(),
      description: ''
    });
  }

  removeChoice(index: number) {
    this.formData.choices.splice(index, 1);
  }

  addCondition() {
    this.formData.conditions.push({
      conditionId: this.formData.conditions.length + 1,
      stepUuid: '',
      choiceUuid: '',
      stepChoices: []
    });
  }

  removeCondition(index: number) {
    this.formData.conditions.splice(index, 1);
  }

  updateStepChoices(uuid: string, conditionIndex: number) {
    const selectedStep = this.filteredStepsData.find(step => step.stepUuid === uuid);
    if (selectedStep && selectedStep.choices) {
      this.formData.conditions[conditionIndex].stepChoices = selectedStep.choices;
    }
  }

  close(): void {
    this.dialogRef.close();
    this.formData = {}; // Reset formData
  }

  save(stepForm: any): void {
    if (this.formData.displayType === 'textbox') {
      this.formData.choices = [];
    }
    if (stepForm.valid) {
    const updatedStep = {
      id: this.data.step.id,
      stepUuid: this.data.step.stepUuid,
     ...this.formData
    };
    this.dialogRef.close(updatedStep);
  }
}
}

interface DisplayType {
  value: string;
  label: string;
}