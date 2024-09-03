// file-upload.service.ts

import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private uploadUrl = environment.postUploadFileURL;
  private createEntityUrl = environment.addDocument;
 filename!:string;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  uploadFile(file: File): Observable<any> {
    const headers = this.authService.getPOSTFileUploadHeaders()
      .set('Content-Type', 'application/octet-stream')
      .set('Content-Disposition', `file; filename="${file.name}"`);

    // Prepare the file data as binary
    const fileData = file;
    this.filename = file.name;
    return this.http.post(this.uploadUrl, fileData, {
      headers,
      responseType: 'json'
    });
  }

  createInvestigationDocument(fid: string, label: string, notes: string, stepId: string, investigationId: string): Observable<any> {
    const headers = this.authService.getPOSTFileUploadHeaders()
      .set('Content-Type', 'application/json');

    const postData = {
      label: this.filename,
      notes,
      stepId,
      investigationId,
      fid,
      visible: true
    };

    return this.http.post(this.createEntityUrl, postData, {headers});
  }

  getDocumentlist(investigationId:string){
    const headers =this.authService.getHeaders();
    return this.http.get<any[]>(`${environment.getDocumentList}${investigationId}`, {headers});
  }

  deleteInvestigationDocument(fileId: string){
    const headers =this.authService.getHeaders();
    return this.http.patch<any[]>(`${environment.deleteInvestigationDocument}${fileId}`, {headers});
  }

}

