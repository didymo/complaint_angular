import {Component, Injectable, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatStepperIntl, MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-investigation-steps-stepper',
  standalone: true,
  imports: [MatStepperModule],
  templateUrl: './investigation-steps-stepper.component.html',
  styleUrl: './investigation-steps-stepper.component.scss'
})
export class InvestigationStepsStepperComponent {

}
