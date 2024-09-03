import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import {Router, RouterLink} from '@angular/router';
import { InvestigationDetailsComponent } from "../investigation-details/investigation-details.component";
import { UpdateInvestegationStepsComponent } from "../update-investegation-steps/update-investegation-steps.component";
import { PreviewInvestigationStepsComponent } from '../preview-investigation-steps/preview-investigation-steps.component';
@Component({
  selector: 'app-manage-investigation-details',
  standalone: true,
  imports: [MatTabsModule, InvestigationDetailsComponent, UpdateInvestegationStepsComponent, RouterLink, PreviewInvestigationStepsComponent],
  templateUrl: './manage-investigation-details.component.html',
  styleUrl: './manage-investigation-details.component.scss'
})
export class ManageInvestigationDetailsComponent implements AfterViewInit {
  @ViewChild('editTab') editTab!: UpdateInvestegationStepsComponent;

  ngAfterViewInit(): void {
   
  }

}
