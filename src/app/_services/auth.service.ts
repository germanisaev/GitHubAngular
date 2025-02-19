import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7174/api/Auth/token';

  constructor(private http: HttpClient) { }

  public getToken(): Observable<any> {
    return this.http.post(this.apiUrl, {});
  }
}
