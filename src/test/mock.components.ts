/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '../app/core/models/question.models';

@Component({
  selector: 'sd-signup-form',
  standalone: true,
  template: '',
})
export class SignupFormComponentMock {}

@Component({
  selector: 'sd-form-question',
  standalone: true,
  template: '',
})
export class FormQuestionComponentMock {
  @Input() form!: FormGroup;
  @Input() question!: Question;
}
