import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../_services/auth.service';
import { CommonModule } from "@angular/common";
import {  RouterLink } from '@angular/router';
import { ListOfInvestigation } from "../../_classes/list-of-investigations";
import { InvestigationService } from "../../_services/investigation.service";
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AddInvestigationDialogComponent } from '../dialog-components/add-investigation-dialog/add-investigation-dialog.component';
import { MatDialog} from '@angular/material/dialog';
import { DuplicateInvestigationDialogComponent } from '../dialog-components/duplicate-investigation-dialog/duplicate-investigation-dialog.component';
import { Step } from '../../_classes/step';
@Component({
  selector: 'app-investigation-list',
  standalone: true,
  imports: [ CommonModule, RouterLink, MatIconModule, MatTable, MatTableModule],
  templateUrl: './investigation-list.component.html',
  styleUrl: './investigation-list.component.scss'

})


export class InvestigationListComponent implements OnInit {
  investigations: ListOfInvestigation[] = [];
  step:Step[] = [];
  displayedColumns: string[] = ['entityid', 'label', 'revisionStatus', 'createdTime', 'actions'];

  constructor(private http: HttpClient, private authService: AuthService, private investigationService: InvestigationService, private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('In the investigation list');
    this.getInvestigationList();
  }

  getInvestigationList(): void {
    this.investigationService.getInvestigationList().subscribe({
      next: (data) => this.investigations = data,
      error: (err) => console.error('Error fetching investigations', err)
    });
  }

  addInvestigation(): void {


    const dialogRef = this.dialog.open(AddInvestigationDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        const formattedData = {
          label: result.label,
          revision_status: result.revision_status, 
          json_string: JSON.stringify({ label: result.label,steps: this.step })
        }

        this.investigationService.addInvestigation(formattedData).subscribe({
          next: (response) => {
            console.log('Successfully added investigation:', formattedData);
            this.getInvestigationList();
          },
          error: (err) => {
            console.error('Error adding investigation:', err);
          }
        });
      }
    });
  }

  duplicateInvestigation(investigation: any): void {

    const dialogRef = this.dialog.open(DuplicateInvestigationDialogComponent, {
      width: '400px', data: {
        investigation: investigation,

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("This is result", result)
      if (result) {
        const formattedData = {
          label: result.label,
          revision_status: result.revision_status, 
          json_string: result.json_string
          //have to add the remeining data fields
        }
        this.investigationService.addInvestigation(formattedData).subscribe({
          next: (response) => {
            console.log('Successfully duplicated investigation:', formattedData);
            this.getInvestigationList();
          },
          error: (err) => {
            console.error('Error duplicating investigation:', err);
          }
        });
      }else{

      }
    });
  }
  deleteInvestigation(id: string): void {

    console.log(id)
    this.investigationService.deleteInvestigation(id).subscribe({
      next: (data) => this.investigations = data,
      error: (err) => console.error('Error fetching investigations', err)
    })

  }


}