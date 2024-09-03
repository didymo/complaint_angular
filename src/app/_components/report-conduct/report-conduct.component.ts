import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReportService } from '../../_services/report.service';
import { InvestigationService } from '../../_services/investigation.service';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { Step } from '../../_classes/step';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { Report } from '../../_classes/report';




@Component({
  selector: 'app-report-conduct',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatSidenavModule, MatDivider, CommonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatRadioModule, EditorComponent, FormsModule, MatCheckbox, FileUploadComponent],
  templateUrl: './report-conduct.component.html',
  styleUrls: ['./report-conduct.component.scss']
})

export class ReportConductComponent implements OnInit {
  report: Report | undefined;
  reportId: string;
  reportDetails: any;
  investigationJson: any;
  selectedValue: any;
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount'
  };

  //Logic Variables
  collapsed = signal(false);
  sideNavWidth = computed(() => this.collapsed() ? '65px' : '350px');
  oneStep: any;
  userChoices: Map<string, string> = new Map(); //questionuuid:selectedchoiceUuid
  checkboxChoices = new Map(); //questionuuid:an array of selected checkboxUuid's
  checkboxGlobal: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private reportService: ReportService,
    private dialog: MatDialog,
    private processService: InvestigationService
   
  ) {
    this.reportId = this.route.snapshot.params['id'];
    this.reportDetails = this.route.snapshot.params['json_string'];
    
  }

  ngOnInit() {
    console.log('In the investigation details');
    this.getReportDetail();
  }

  onSave() {
    // Handle the form submission logic here
    console.log('Form submitted:', this.reportDetails);
    this.reportService.updateReport(this.reportDetails.entityId, this.reportDetails).subscribe(
      (error) => {
        console.error('Error saving investigation answers:', error)
      }
    );
  }


  getReportDetail(): void {
    console.log('Calling Report Details!');
    const headers = this.authService.getHeaders();
    this.reportService.getReport(this.reportId, headers).subscribe(
      (data) => {
        this.reportDetails = data;
        if (this.reportDetails.steps) {
          this.reportDetails.steps[0].isVisible = true;
          this.oneStep = this.reportDetails.steps[0];
          this.reportService.setDocumentDetails(this.reportDetails.entityId, this.reportDetails.reportLabel,this.oneStep.id);
 
        }
      },
      (error) => {
        console.error('Error fetching report details:', error);
      }
    );
  }

  // -- DIVIDER Ruban's methods below

  getStep(stepUuid: string) {
    for (const step of this.reportDetails.steps) {
      if (step && step.stepUuid == stepUuid) {
        this.oneStep = step;
        this.reportService.setDocumentDetails(this.reportDetails.entityId, this.reportDetails.label,this.oneStep.id);
        this.report = new Report(this.oneStep.entityId, this.oneStep.reportLabel, this.oneStep.investigationId);

      }
    }
    return [];
  }

  onRadioChange(event: any, step: Step) {
    //store the choice in userChoices
    this.userChoices.set(step.stepUuid, event.value);
    step.isCompleted = true;

    var currentindex = step.id;
    for (currentindex; currentindex < this.reportDetails.steps.length; currentindex++) {
      this.reportDetails.steps[currentindex].isVisible = false;
      this.userChoices.delete(this.reportDetails.steps[currentindex].stepUuid);
      this.reportDetails.steps[currentindex].isCompleted = false;
      this.reportDetails.steps[currentindex].answer = "";
    }
    //determine the next step based on conditions
    this.updateSteps();
  }

  onCheckboxChange(choice: any, step: Step) {
    //store the choice in userChoices
    if (choice.selected) { // checkbox checked
      if (this.checkboxChoices.get(step.stepUuid))
        {
          this.checkboxChoices.get(step.stepUuid).push(choice.choiceUuid);
        }
      else 
        {
          this.checkboxChoices.set(step.stepUuid, [choice.choiceUuid]);
        }
    }
    else //checkbox unchecked
    {
      if (this.checkboxChoices.get(step.stepUuid))
      {
        let values = this.checkboxChoices.get(step.stepUuid);

        const index = values.findIndex((ab: any) => ab === choice.choiceUuid);
        values.splice(index, 1);
        console.log("index: ", index);
        this.checkboxChoices.set(step.stepUuid, values); //update the map
        console.log('values:', values);
      }
    }
    
    console.log('checkboxChoices: ', this.checkboxChoices);
    
    step.isCompleted = true;
    const selectedChoices = step.choices.filter(c => c.selected);
    step.answer = selectedChoices.map(c => c.choiceUuid).join(', ');
    this.checkboxGlobal = selectedChoices;
    console.log('SelChoice', selectedChoices);

    var currentindex = step.id;
    for (currentindex; currentindex < this.reportDetails.steps.length; currentindex++) {
      this.reportDetails.steps[currentindex].isVisible = false;
      this.userChoices.delete(this.reportDetails.steps[currentindex].stepUuid);
      this.reportDetails.steps[currentindex].isCompleted = false;
      this.reportDetails.steps[currentindex].answer = "";
    }

    this.updateSteps();
    //determine the next step based on conditions
    
    //else if(!choice.selected)
    //{
    //  this.userChoices.delete(step.stepUuid);
    //  this.updateSteps();
    //  console.log("local checkbox update");
    //}

  }

  getChoiceLabel(choiceUuid: any) {
    for (const step of this.reportDetails.steps) {
      for (const choice of step.choices) {
        if (choice.choiceUuid == choiceUuid) {
          return choice.description;
        }
      }
    }
    return "";
  }

  updateSteps() {
    for (const step of this.reportDetails.steps) {
      step.isVisible = this.checkVisibility(step);
    }
  }

  checkVisibility(step: any): boolean {
    //if there are no conditions, the step is always visible
    if (!step.conditions || step.conditions.length === 0 || step.isCompleted === true) {
      return true;
    }
    //check each condition
    for (const condition of step.conditions) {
      const userChoice = this.userChoices.get(condition.stepUuid);
      const checkboxChoice = this.checkboxChoices.get(condition.stepUuid);
      if (userChoice === condition.choiceUuid) {
        return true;
      }
      if (this.checkboxGlobal)
      {
        for (const choice of this.checkboxGlobal) {
          if (choice.choiceUuid === condition.choiceUuid) {
            return true;
          }
        }
      }
    }
    return false;
  }

}