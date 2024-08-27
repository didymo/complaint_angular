/**
 * @whatItDoes Represents an step choice.
 *
 * @description
 *  An step choice forms a single choice in an step.
 */
export class StepChoice {
  constructor( id: string, choiceUuid: string, description: string, selected: boolean) {
    this.choiceUuid = choiceUuid;
    this.id = id;
    this.description = description;
    this.selected = selected

  }


  /**
   * The choice ID
   */
   id: string;

  /**
   * The Unique Id for each choice.
   */
  choiceUuid: string;

  /**
   * The description of the choice.
   */
    description: string;


    selected: boolean;

}
