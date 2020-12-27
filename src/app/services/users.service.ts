import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NewUser, User, response, NewJob, Quotation, UpdateUser, UpdatePassword } from 'src/app/classes/user';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // domainKey = 'https://income-live.herokuapp.com/api/';
  domainKey = 'https://income-qa.herokuapp.com/api/';
  // domainKey = 'http://127.0.0.1:8000/api/';
  httpOptions2: { headers: HttpHeaders; responseType?: 'json'; };
  constructor(private http: HttpClient, private nativeStorage: NativeStorage,private uniqueDeviceID: UniqueDeviceID,) {

  }
  loadToken() {
    try {
      this.httpOptions2 = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        })
      };
    }
    catch(error) {
      console.log(error);
      this.httpOptions2 = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        })
      };
    }
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);/////No network/Internet Error
    }
    else {
      console.error(error.error.message); ///  Backend errors
    }
    return throwError(error.error); //User might see this
  }

  // Register User
  fetchCurrency() {
    return this.http
      .get<response>('https://restcountries.eu/rest/v2/all')
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // Register User
  register(user: NewUser): Observable<any> {
    return this.http
      .post<any>(this.domainKey + 'users/signup', JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // Sign in User
  signin(user: User) {
    return this.http
      .post<response>(this.domainKey + 'users/signin', JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // Sign out User
  signout() {
    this.loadToken();
    return this.http
      .post<response>(this.domainKey + 'users/signout','', this.httpOptions2)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // Check token validity
  checkToken() {
    this.loadToken();
    return this.http
      .post<response>(this.domainKey + 'users/token','', this.httpOptions2)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Forgot password
  forgotpassword(user: User) {
    return this.http
      .post<response>(this.domainKey + 'users/reset', JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // Update user details
  updateUser(user: UpdateUser) {
    this.loadToken();
    return this.http
      .post<response>(this.domainKey + 'users/', JSON.stringify(user), this.httpOptions2)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // Update user logo
  updatePicture(data) {
    this.loadToken();
    return this.http
      .post<response>(this.domainKey + 'users/logo', data, this.httpOptions2)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // Remove user logo
  removePicture() {
    this.loadToken();
    return this.http
      .delete<response>(this.domainKey + 'users/logo', this.httpOptions2)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // Update user details
  updatePassword(data: UpdatePassword) {
    this.loadToken();
    return this.http
      .post<response>(this.domainKey + 'users/password/', JSON.stringify(data), this.httpOptions2)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // getUserInfo
  getUserInfo() {
    this.loadToken();
    return this.http
      .get<response>(this.domainKey + 'user', this.httpOptions2)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }
  // getUserReport
  getUserJobs(offset, limit) {
    this.loadToken();
    let body = {
      "offset": offset,
      "limit": limit
    }
    return this.http
      .post<response>(this.domainKey + 'jobs', JSON.stringify(body), this.httpOptions2)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  // get user jobs
  getUserReport() {
    this.loadToken();
    return this.http
      .get<response>(this.domainKey + 'jobs/report', this.httpOptions2)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  // Create new job
  createNewJob(data:NewJob) {
    this.loadToken();
    return this.http
      .post<response>(this.domainKey + 'jobs/new', data, this.httpOptions2)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  // Edit job
  editJob(data:NewJob) {
    this.loadToken();
    return this.http
      .put<response>(this.domainKey + 'jobs', data, this.httpOptions2)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  // Edit job
  editJobStatus(data:any) {
    this.loadToken();
    return this.http
      .put<response>(this.domainKey + 'jobs/status', data, this.httpOptions2)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  // Delete job
  deleteJob(id:any) {
    this.loadToken();
    return this.http
      .delete<response>(this.domainKey + 'jobs/'+id, this.httpOptions2)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  // Get one job
  getOneJob(id:number) {
    this.loadToken();
    return this.http
      .get<response>(this.domainKey + 'job/'+id, this.httpOptions2)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }
  // Create new quotation
  createNewQuotation(data:Quotation) {
    this.loadToken();
    return this.http
      .post<response>(this.domainKey + 'quotation/new', data, this.httpOptions2)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }
  // Create new quotation
  editQuotation(data:Quotation) {
    this.loadToken();
    return this.http
      .post<response>(this.domainKey + 'quotation/', data, this.httpOptions2)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }
}
