import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Question } from '../../models/question.models';

@Component({
  selector: 'sd-form-question',
  standalone: true,
  imports: [ReactiveFormsModule, NgTemplateOutlet],
  templateUrl: './form-question.component.html',
  styleUrl: './form-question.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormQuestionComponent {
  @Input() form!: FormGroup;
  @Input() question!: Question;
}
