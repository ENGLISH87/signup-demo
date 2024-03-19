import { Component } from '@angular/core';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

@Component({
  selector: 'sd-root',
  standalone: true,
  imports: [SignupFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Sign up';
}
