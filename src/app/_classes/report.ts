export class Report {
  constructor( entityId: number, label: string,   investigationId: number) {
    this.entityId = entityId;
    this.label = label;
    this.investigationId = investigationId;
  }

  /**
   * The  id of the report.
   */
  entityId: number;

  /**
   * The name of the report.
   */
  label: string;

 
  /**
   * A list of steps 
   */
  investigationId: number;
}


