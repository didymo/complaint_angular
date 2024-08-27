import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ListOfReport} from "../_classes/list-of-reports";
import { Report } from '../_classes/report';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ReportService {


  constructor(private http: HttpClient, private authService: AuthService) {}

  //file handling input info
  investigationId!: string;
  label!: string;
  stepId!: string;

  setDocumentDetails(investigationId: string, label: string, stepId: string){
    this.investigationId = investigationId;
    this.label = label;
    this.stepId = stepId;
  }

  getInvestigationId(): string{
    return this.investigationId;
  }
  getLabel(): string{
    return this.label;
  }
  getStepId(): string{
    return this.stepId;
  }


  //Report
  getReportList(): Observable<ListOfReport[]> {
    const headers = this.authService.getHeaders();
    return this.http.get<ListOfReport[]>(environment.reportListURL, { headers });
  }
  addReport(data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post<Report>(environment.addReportListURL, data, { headers });
  }
  deleteReport(reportId:string): Observable<any>{
   
    const headers =this.authService.getHeaders();
    return this.http.delete<Report>(`${environment.deleteReportURL}${reportId}`, { headers });
  }

  getReport(reportId: string, headers: HttpHeaders): Observable<Report> {
    return this.http.get<Report>(`${environment.getReportURL}${reportId}?_format=json`, { headers });
  }

  updateReport(reportId: string, newSteps: any): Observable<Report> {
    console.log(reportId);
    console.log(`${environment.updateReportURL}${reportId}`);
    const headers =this.authService.getHeaders();
    return this.http.patch<Report>(`${environment.updateReportURL}${reportId}`, newSteps, { headers });
  }


}
