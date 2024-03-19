import { ValidatorFn } from '@angular/forms';

export interface Question {
  key: string;
  placeholder?: string;
  label: string;
  validators: ValidatorFn[];
  type: 'text' | 'select' | 'password' | 'email' | 'checkbox'; // etc
  controlType: 'textbox' | 'dropdown';
}
