import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { FormQuestionComponentMock } from '../../../test/mock.components';
import { FormQuestionComponent } from '../../core/components/form-question/form-question.component';
import { SignupData } from '../../core/models/signup.models';
import { DataService } from '../../core/services/data.service';
import { SignupFormComponent } from './signup-form.component';
import { signupQuestions } from './signup-form-questions';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let dataSvc: DataService;
  let debugEl: DebugElement;
  let submitBtn: HTMLButtonElement;

  const formValue: SignupData = {
    firstName: 'test',
    lastName: 'test',
    email: 'test@hotmail.com',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupFormComponent, NoopAnimationsModule],
      providers: [
        {
          provide: DataService,
          useValue: {
            submit: () => of(void 0),
          },
        },
      ],
    })
      .overrideComponent(SignupFormComponent, {
        remove: { imports: [FormQuestionComponent] },
        add: { imports: [FormQuestionComponentMock] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);
    dataSvc = TestBed.inject(DataService);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
    component.questions = signupQuestions;
    fixture.detectChanges();

    submitBtn = debugEl.query(By.css('button')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial form questions', () => {
    const qs = debugEl.queryAll(By.css('sd-form-question'));
    expect(qs.length).toEqual(signupQuestions.length);
  });

  it('should display disabled submit button', () => {
    expect(submitBtn.disabled).toBeTrue();
  });

  it('should display error form message', fakeAsync(() => {
    component.form.setValue(formValue);
    component.form.updateValueAndValidity();
    fixture.detectChanges();

    spyOn(dataSvc, 'submit').and.returnValue(throwError(() => 'Something went wrong'));
    submitBtn.click();
    fixture.detectChanges();

    expect(debugEl.query(By.css('.err'))).toBeTruthy();
  }));

  it('should display success message and hide form on success', () => {
    component.success = true;
    fixture.detectChanges();

    expect(debugEl.query(By.css('form'))).toBeFalsy();
    expect(debugEl.query(By.css('.success'))).toBeTruthy();
  });

  it('should submit form and display submitting... whilst waiting for api call', fakeAsync(() => {
    spyOn(dataSvc, 'submit').and.returnValue(of(void 0));

    submitBtn.click();
    expect(dataSvc.submit).not.toHaveBeenCalled();

    component.form.setValue(formValue);
    component.form.updateValueAndValidity();
    fixture.detectChanges();

    submitBtn.click();
    fixture.detectChanges();

    tick(200);
    fixture.detectChanges();

    expect(submitBtn.textContent).toContain('submitting...');

    tick(2200);
    fixture.detectChanges();

    expect(dataSvc.submit).toHaveBeenCalledWith(formValue);
  }));
});
