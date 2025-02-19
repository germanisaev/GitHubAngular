import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json')
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userSubject: BehaviorSubject<string>;
  public user: Observable<string>;

  private apiUrl = 'https://localhost:7174/api';

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        const storage: any = localStorage.getItem('user');
        this.userSubject = new BehaviorSubject<any>(storage);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): string {
        return this.userSubject.value;
    }

    login(credentials: any) {
        return this.http.post<any>(`${this.apiUrl}/Auth/login`, credentials, httpOptions)
            .pipe(
                catchError(this.errorHandler),
                map(
                (user: any) => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('token', JSON.stringify(user.access_token));
                    console.log(user);
                    this.userSubject.next(JSON.stringify(user));
                    return user;
                },
                (error: any) => {
                    console.error(error);
                    return null;
                })
                );
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next('');
        this.router.navigate(['/login']);
    }
    
    errorHandler(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }
}
