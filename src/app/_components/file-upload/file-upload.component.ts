import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import {
  HttpClient,
  HttpEventType,
  HttpHeaders, provideHttpClient
} from "@angular/common/http";
import {MatCardModule} from '@angular/material/card';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadService } from '../../_services/file-upload.service';
import { DocumentService } from '../../_services/document.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatDivider, MatButtonModule, MatIconModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  uploadResponse: string | null = null;
  documentList: any[] = [];
  filteredDocumentList: any[] = [];
  constructor(private fileUploadService: FileUploadService, private documentService: DocumentService) { }

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
    const label = this.documentService.getLabel();
    const notes = 'This is a test document';
    const stepId = this.documentService.getStepId();  
    const investigationId = this.documentService.getInvestigationId();

    this.fileUploadService.createInvestigationDocument(fid, label, notes, stepId, investigationId).subscribe({
      next: (response) => {
        console.log('Investigation document creation complete:', response);
        this.uploadResponse = `Upload and entity creation successful: ${JSON.stringify(response)}`;
        this.getDocumentList();
      },
      error: (err) => {
        console.error('Entity creation error:', err);
        this.uploadResponse = `Entity creation failed: ${err.message}`;
      }
    });
  }

  getDocumentList(): void {
    this.fileUploadService.getDocumentlist(this.documentService.getInvestigationId()).subscribe({
      next: (data) => {
        this.documentList = data;
        
        const stepId = this.documentService.getStepId();
        this.filteredDocumentList = this.documentList.filter(d => d.stepId == stepId);
        console.log("Doc:", this.documentList);
        console.log(this.filteredDocumentList);
      },
      error: (err) => console.error('Error fetching reports', err)
    });
  }

  deleteDocument(fileId: string):void{
    this.fileUploadService.deleteInvestigationDocument(fileId).subscribe({
      next: (response) =>{
        console.log('Successfully deleted investigation document ', fileId);
        this.getDocumentList();
      },
      error: (err) =>{
        console.error('Error deleting investigation document', err);
      }
    })
  
  }


}
