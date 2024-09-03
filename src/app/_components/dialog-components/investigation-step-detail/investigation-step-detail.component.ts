import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Step } from '../../../_classes/step';

@Component({
  selector: 'app-investigation-step-detail',
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './investigation-step-detail.component.html',
  styleUrl: './investigation-step-detail.component.scss'
})
export class InvestigationStepDetailComponent {
 
  constructor( public dialogRef: MatDialogRef<InvestigationStepDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: { step: any; stepsData: any[] }){}
  investigationStep: Step = this.data.step;
  investigationSteps: Step[] = this.data.stepsData;

  getStepDescription(stepUuid: string){
    for (const step of this.data.stepsData) {   
      if (step && step.stepUuid === stepUuid) {
        return step.description;
      }
    }
  
  return ""; 
  }
  getChoiceDescription(stepUuid: string, choiceUuid: string){
    for (const step of this.data.stepsData) {   
      if (step && step.stepUuid === stepUuid) {
        for(const choice of step.choices){
          if(choice && choice.choiceUuid === choiceUuid){
            return choice.description;
          }
        }
      }
    }
  
  return ""; 
  }
 
}
