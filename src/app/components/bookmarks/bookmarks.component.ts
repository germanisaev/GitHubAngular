import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.css'
})
export class BookmarksComponent {
  
  @Input() bookmarks: any[] = [];

  removeBookmark(repo: any) {
    const index = this.bookmarks.indexOf(repo, 0);
    if (index > -1) {
      this.bookmarks.splice(index, 1);
    }
  }
  
}
