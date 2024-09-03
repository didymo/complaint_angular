

import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InvestigationService} from "../../_services/investigation.service";
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AddInvestigationStepDialogComponent } from '../dialog-components/add-investigation-step-dialog/add-investigation-step-dialog.component';
import { InvestigationStepDetailComponent } from '../dialog-components/investigation-step-detail/investigation-step-detail.component';

@Component({
  selector: 'app-investigation-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatTable, MatTableModule, MatTabsModule, MatButtonModule, MatIconModule],
  templateUrl: './investigation-details.component.html',
  styleUrl: './investigation-details.component.scss'
})
export class InvestigationDetailsComponent implements OnInit {
  investigationId: string;
  investigationDetails: any;
  investigationSteps: any;
  displayedColumns: string[] = ['id', 'description', 'displayType', 'required','logic', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private investigationService: InvestigationService,
    private dialog: MatDialog
  ) {
    this.investigationId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    console.log('In the investigation details');
    this.getInvestigationDetail();
  }

  getInvestigationDetail(): void {
    const headers = this.authService.getHeaders();
    this.investigationService.getInvestigationSteps(this.investigationId, headers).subscribe(
      (data) => {
        this.investigationDetails = data;
        this.investigationSteps = data.steps;
      
      },
      (error) => {
        console.error('Error fetching investigation details:', error);
      }
    );
  }
  openViewDetailDialog(step: any): void {
    const dialogRef = this.dialog.open(InvestigationStepDetailComponent, {
      width: '60%',
      data: { step: step, stepsData: this.investigationSteps }
    });
  
  }
  addStep():void {
 
  const dialogRef = this.dialog.open(AddInvestigationStepDialogComponent, {
    width: '60%',
    data: this.investigationSteps
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.investigationService.addInvestigationStep(this.investigationDetails.entityId, result).subscribe({
        next: (response) => {
          console.log('Successfully added step:', result);
          this.getInvestigationDetail();
        },
        error: (err) => {
          console.error('Error adding step:', err);
        }
      });
    }
  });
  }


}