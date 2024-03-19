import { Validators } from '@angular/forms';
import { Question } from '../../core/models/question.models';

export const firstNameQuestion: Question = {
  key: 'firstName',
  label: 'First Name',
  placeholder: 'John',
  validators: [Validators.required],
  type: 'text',
  controlType: 'textbox',
};

export const lastNameQuestion: Question = {
  key: 'lastName',
  label: 'Last Name',
  placeholder: 'Smith',
  validators: [Validators.required],
  type: 'text',
  controlType: 'textbox',
};

export const emailQuestion: Question = {
  key: 'email',
  label: 'Email',
  placeholder: 'john.smith@directlinegroup.co.uk',
  validators: [Validators.required, Validators.email],
  type: 'email',
  controlType: 'textbox',
};

export const signupQuestions: Question[] = [firstNameQuestion, lastNameQuestion, emailQuestion];
