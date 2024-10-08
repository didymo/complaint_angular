import { Condition } from "./condition";
import {StepChoice} from "./step-choice";

export class Step {




  constructor(id: number, stepUuid: string, displayType: string,  required: string, description: string, choices: StepChoice[], conditions: Condition[], isCompleted: boolean, isVisible: boolean, answer: string, textAnswer: string) {

    this.id = id;
    this.stepUuid = stepUuid;
    this.description = description;
    this.displayType = displayType;
    this.required = required;
    this.choices = choices;
    this.conditions = conditions;
    this.isCompleted = isCompleted;
    this.isVisible = isVisible;
    this.answer = answer;
    this.textAnswer = textAnswer;
  }


 
  /**
   * id of a step
   */
  id: number;

  /**
   * Unique id for each step
   */
  stepUuid: string;

  /**
   * The description will be displayed to the user as question labels
   */
  description: string;

  /**
   * The type of choice i.e: radiobutton/checkbox
   */
  displayType: string;

  /**
   * Determines a step is required to complete the investigation or not (0 - no, 1 -yes)
   */
  required: string;

  /**
   * An array of step choices.
   * If an step has no choices, it will still be populated by one step choice. It's not used.
   */
  choices: StepChoice[];

  /**
   * An array of conditions which includes the skip logic conditions.
   */
  conditions: Condition[];

  /**
   * Should the step be visible (according to the logic)?
   */
  isVisible: boolean;

  /**
   * Has the step been filled?
   */
  isCompleted: boolean;

  /**
   * Holds answers
   */
  answer: string;

  /**
   * Holds answers to the "more details" tiny MCE WISYSWIG
   */
  textAnswer: string;
}
