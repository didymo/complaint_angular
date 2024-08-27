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
import { UuidService } from '../../../_services/uuid.service';
import { Step } from '../../../_classes/step';

@Component({
  selector: 'app-add-investigation-step-dialog',
  standalone: true,
  imports: [MatFormField, ReactiveFormsModule,
    MatDialogModule, CommonModule,MatIconModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule],
  templateUrl: './add-investigation-step-dialog.component.html',
  styleUrl: './add-investigation-step-dialog.component.scss'
})
export class AddInvestigationStepDialogComponent {
  
  formData: any = {
    description: '',
    required: '',
    displayType: '',
    choices: [],
    conditions: []
  };

  displayType: DisplayType[] = [
    { value: 'radio', label: 'Radio' },
    { value: 'radio&text', label: 'Radio & Text' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'checkbox&text', label: 'Checkbox & Text' },
    { value: 'textbox', label: 'Textbox' }
  ];

  filteredStepsData: Step[] = [];

  constructor(
    private uuidService: UuidService,
    public dialogRef: MatDialogRef<AddInvestigationStepDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[]
  ) {
    this.filteredStepsData = data.filter(s => s.displayType !== "textbox");
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
    if (stepForm.valid) {
      const newStepData = {
        id: this.data.length + 1,
        stepUuid: this.uuidService.generateUuid(),
        answer: '',
        textAnswer: '',
        isVisible: false,
        isCompleted: false,
        ...this.formData
      };
      this.dialogRef.close(newStepData);
    }
  }
}

interface DisplayType {
  value: string;
  label: string;
}