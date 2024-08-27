import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import {
  HttpClient,
  HttpEventType,
  HttpHeaders, provideHttpClient
} from "@angular/common/http";
import { FileUploadService } from '../../_services/file-upload.service';
import { ReportService } from '../../_services/report.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  uploadResponse: string | null = null;
  documentList: any[] = [];

  constructor(private fileUploadService: FileUploadService, private reportService: ReportService) { }

  ngOnInit() {
    this.getDocumentList();

  }
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    this.fileUploadService.uploadFile(this.selectedFile).subscribe({
      next: (response) => {
        console.log('Upload complete:', response);

        // Extract the fid from the response
        const fileFid = response?.fid?.[0]?.value;
        if (fileFid) {
          // Proceed to create the investigation document entity
          this.createInvestigationDocument(fileFid);
        } else {
          console.error('File fid not found in the response');
          this.uploadResponse = 'File upload successful, but file fid is missing.';
        }
      },
      error: (err) => {
        console.error('Upload error:', err);
        this.uploadResponse = `Upload failed: ${err.message}`;
      }
    });
  }

  createInvestigationDocument(fid: string): void {
    const label = this.reportService.getLabel();
    const notes = 'This is a test document';
    const stepId = this.reportService.getStepId();  
    const investigationId = this.reportService.getInvestigationId();

    this.fileUploadService.createInvestigationDocument(fid, label, notes, stepId, investigationId).subscribe({
      next: (response) => {
        console.log('Investigation document creation complete:', response);
        this.uploadResponse = `Upload and entity creation successful: ${JSON.stringify(response)}`;
      },
      error: (err) => {
        console.error('Entity creation error:', err);
        this.uploadResponse = `Entity creation failed: ${err.message}`;
      }
    });
  }

  getDocumentList(): void {
   
    this.fileUploadService.getDocumentlist(this.reportService.getInvestigationId()).subscribe({
      next: (data) => this.documentList = data,
      error: (err) => console.error('Error fetching reports', err)
    });

    console.log(this.documentList)
  }



}
