import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {RouterLink} from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { ReportService } from '../../_services/report.service';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-report-conduct',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatTable, MatTableModule],
  templateUrl: './report-conduct.component.html',
  styleUrls: ['./report-conduct.component.scss']
})
export class ReportConductComponent implements OnInit {
  reportId: string;
  reportDetails: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private reportService: ReportService,
    private dialog: MatDialog
  ) {
    this.reportId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    console.log('In the investigation details');
    this.getReportDetail();
  }

  getReportDetail(): void {
    const headers = this.authService.getHeaders();
    this.reportService.getReport(this.reportId, headers).subscribe(
      (data) => {
        this.reportDetails = data;
        console.log('Report Details:', data);
      },
      (error) => {
        console.error('Error fetching report details:', error);
      }
    );


  }

}
