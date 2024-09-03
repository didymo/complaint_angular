import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../_services/auth.service';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReportService } from '../../_services/report.service';
import { DocumentService } from '../../_services/document.service';
import { InvestigationService } from '../../_services/investigation.service';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckbox } from '@angular/material/checkbox';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { Step } from '../../_classes/step';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
@Component({
  selector: 'app-preview-investigation-steps',
  standalone: true,
  imports: [MatRadioModule, CommonModule, MatCheckbox, EditorComponent],
  templateUrl: './preview-investigation-steps.component.html',
  styleUrl: './preview-investigation-steps.component.scss'
})
export class PreviewInvestigationStepsComponent {

  investigationId: string;
  investigationDetail: any;
  investigationSteps: any;
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount'
  };

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private investigationService: InvestigationService,
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
        this.investigationDetail = data;
        this.investigationSteps = data.steps;  
      },
      (error) => {
        console.error('Error fetching investigation details:', error);
      }
    );
  }
  

}
