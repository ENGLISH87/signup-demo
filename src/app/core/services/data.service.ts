import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupData } from '../models/signup.models';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  /**
   * Submit new signup
   * @param data signup form data
   * @returns 200 success
   */
  submit(data: SignupData): Observable<void> {
    const url = `${environment.apiUrl}/signup`;
    return this.http.post<void>(url, data);
  }
}
