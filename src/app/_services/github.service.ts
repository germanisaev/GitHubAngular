import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {

    private baseUrl = 'https://localhost:7174/api/GitHub/repositories';

    constructor(private http: HttpClient) {}

    searchRepositories(query: string): Observable<any[]> { 

      return this.http.get<any[]>(`${this.baseUrl}?query=${query}`); 
      
    }
}
