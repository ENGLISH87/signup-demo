import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { fadeInOnly } from '../../core/animations/animations';
import { FormQuestionComponent } from '../../core/components/form-question/form-question.component';
import { Question } from '../../core/models/question.models';
import { SignupData } from '../../core/models/signup.models';
import { DataService } from '../../core/services/data.service';
import { signupQuestions } from './signup-form-questions';

@Component({
  selector: 'sd-signup-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormQuestionComponent],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
  animations: [fadeInOnly],
})
export class SignupFormComponent implements OnInit {
  form!: FormGroup;
  questions: Question[] = signupQuestions;

  success: boolean = false;
  loading: boolean = false;
  error: string | undefined;

  constructor(private dataSvc: DataService) {}

  ngOnInit() {
    // setup form - toFormGroup could be moved to a static class or into a service
    this.form = this.toFormGroup(this.questions);
  }

  /**
   * Submit form data to api
   * @param form signup form
   */
  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.loading = true;
      this.error = undefined;
      const data: SignupData = form.value;

      this.dataSvc
        .submit(data)
        .pipe(delay(2000)) // added delay operator to demo loading
        .subscribe({
          next: () => (this.success = true),
          error: (err) => (this.error = err),
        })
        .add(() => (this.loading = false));
    }
  }

  /**
   * Convert questions array into FormGroup
   * @param questions form questions array
   * @returns FormGroup
   */
  toFormGroup(questions: Question[]): FormGroup {
    const grp: Record<string, FormControl> = {};
    questions.forEach((q: Question) => {
      grp[q.key] = new FormControl('', [...q.validators]);
    });

    return new FormGroup(grp);
  }
}
