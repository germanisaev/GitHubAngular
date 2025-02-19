import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css'
})
export class BookmarkComponent {
  @Input() bookmark: any;
  @Output() removeBookmark = new EventEmitter<any>();

  deleteBookmark() {
    this.removeBookmark.emit(this.bookmark);
  }
}
