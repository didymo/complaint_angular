/**
 * Stores the data of a Report retrieved from the list of Reports
 */
export class ListOfReport {
    constructor(
      label: string,
      entityId: number,
      revisionCreationTime: string,
      investigationId: number,
      createdTime:string
    ) {
      this.label = label;
      this.entityId = entityId;
      this.revisionCreationTime = revisionCreationTime;
      this.investigationId = investigationId;
      this.createdTime = createdTime;
    }
    /**
     * The title of a report
     */
    label: string;
  
    /**
     * Reprents the id given by drupal for the report
     */
    entityId: number;
  
    /**
     * 
     */
    revisionCreationTime: string;
  
    /**
     * Determines the linked investigation.
     */
    investigationId: number;
  
    /**
     * Time when the investigation  created
     */
    createdTime:string;
  }
  