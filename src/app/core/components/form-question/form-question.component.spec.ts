import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { firstNameQuestion } from './../../../components/signup-form/signup-form-questions';
import { FormQuestionComponent } from './form-question.component';

describe('FormQuestionComponent', () => {
  let component: FormQuestionComponent;
  let fixture: ComponentFixture<FormQuestionComponent>;
  let debugEl: DebugElement;

  const formGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormQuestionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormQuestionComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;

    component.form = formGroup;
    component.question = firstNameQuestion;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display textbox input with attributes matching question properties', () => {
    const inputEl: HTMLInputElement = debugEl.query(By.css('input')).nativeElement;

    expect(inputEl.id).toEqual(firstNameQuestion.key);
    expect(inputEl.placeholder).toEqual(firstNameQuestion.placeholder!);
    expect(inputEl.type).toEqual(firstNameQuestion.type);
  });

  it('should display form control error message', () => {
    const inputEl: HTMLInputElement = debugEl.query(By.css('#firstName')).nativeElement;
    inputEl.dispatchEvent(new Event('input'));
    formGroup.get('firstName')?.markAsTouched();
    fixture.detectChanges();

    const errEl: HTMLSpanElement = debugEl.query(By.css('.form-err')).nativeElement;
    expect(errEl.textContent).toContain(`${firstNameQuestion.label} is required`);
  });
});
