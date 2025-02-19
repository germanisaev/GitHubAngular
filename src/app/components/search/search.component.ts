import { Component, OnInit } from '@angular/core';
import { GitHubService } from '../../_services/github.service';
import { LoginService } from '../../_services/login.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchTerm = '';
  token = '';
  repositories: any[] = [];
  bookmarks: any[] = [];

  constructor(private gitHubService: GitHubService, 
              private accountService: LoginService) {}

  search() {
    if(!this.searchTerm.trim()) return;
    
    this.gitHubService.searchRepositories(this.searchTerm).subscribe({
      next: (data: any) => {
        this.repositories = data.items;
      },
      error: (err: any) => {
        console.error('Error fetching repositories', err);
      }
    });
  }

  reciveBookmark(repo: any) {
    let flag = true;
    this.bookmarks.forEach((value, index) => {
      if(value.id == repo.id) {
        flag = false;
        return;
      }
    });
    
    if(flag)
      this.bookmarks.push(repo);
  }

  logout() {
    if (this.accountService.userValue) {
      this.accountService.logout();
    }
  }

}
