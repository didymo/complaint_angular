import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadService } from '../../_services/file-upload.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-generate-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generate-report.component.html',
  styleUrl: './generate-report.component.scss'
})
export class GenerateReportComponent {
 
 documentList:any[] =[];

  constructor(private http: HttpClient, private authService: AuthService, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    console.log('In the report list');
    this.getDocumentList();
  }

  getDocumentList(): void {
    this.fileUploadService.getDocumentlist('46').subscribe({
      next: (data) => this.documentList = data,
      error: (err) => console.error('Error fetching reports', err)
    });
  }

}
