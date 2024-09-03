import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private investigationId!: string;
  private label!: string;
  private stepId!: string;

  setDocumentDetails(investigationId: string, label: string, stepId: string): void {
    this.investigationId = investigationId;
    this.label = label;
    this.stepId = stepId;
  }

  getInvestigationId(): string {
    return this.investigationId;
  }

  getLabel(): string {
    return this.label;
  }

  getStepId(): string {
    return this.stepId;
  }

  clearDocumentDetails(): void {
    this.investigationId = '';
    this.label = '';
    this.stepId = '';
  }
}
