import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { SignupData } from '../models/signup.models';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DataService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post form data on submit()', (done) => {
    const data: SignupData = {
      firstName: 'Tom',
      lastName: 'Smith',
      email: 'tom.smith@hotmail.co.uk',
    };
    const res = new HttpResponse({ status: 200, statusText: 'success' });
    service.submit(data).subscribe((res) => {
      expect(res);
      done();
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/signup`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(data);
    req.flush(res);
  });
});
