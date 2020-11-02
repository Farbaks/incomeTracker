import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NewUser, User, response } from 'src/app/classes/user';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  domainKey = 'https://gentle-ravine-26248.herokuapp.com/api/';
  httpOptions2: { headers: HttpHeaders; responseType?: 'json'; };
  // domainKey = 'http://127.0.0.1:8000/api/';
  token: any = "";
  constructor(private http: HttpClient, private nativeStorage: NativeStorage,private uniqueDeviceID: UniqueDeviceID,) {
    this.nativeStorage.getItem('token')
      .then(
        (token) => {
          this.token = token;
          this.httpOptions2 = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': 'Bearer ' + token,
            })
          };
        },
        error => {
          this.httpOptions2 = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': 'Bearer ',
            })
          };
        }
      );
  }

  // Http Options
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
      console.error(error.error); ///  Backend errors
    }
    return throwError(error.error); //User might see this
  }

  // Register User
  fetchCurrency() {
    return this.http
      .get<response>('https://restcountries.eu/rest/v2/all' + this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // Register User
  register(user: NewUser): Observable<any> {
    return this.http
      .post<any>(this.domainKey + 'users/signup', JSON.stringify(user), this.httpOptions2)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // Sign in User
  signin(user: User) {
    return this.http
      .post<response>(this.domainKey + 'users/signin', JSON.stringify(user), this.httpOptions2)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // Forgot password
  forgotpassword(user: User) {
    return this.http
      .post<response>(this.domainKey + 'users/reset', JSON.stringify(user), this.httpOptions2)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }

  // getUserInfo
  getUserInfo() {
    return this.http
      .get<response>(this.domainKey + 'user', this.httpOptions2)
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }
  // getUserReport
  getUserJobs(offset, limit) {
    let body = {
      "offset": offset,
      "limit": limit
    }
    return this.http
      .post<response>(this.domainKey + 'jobs/', JSON.stringify(body), this.httpOptions2)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  // get user jobs
  getUserReport() {
    return this.http
      .get<response>(this.domainKey + 'jobs/report', this.httpOptions2)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

}
