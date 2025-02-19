import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.css'
})
export class RepositoryComponent {

  @Input() repository?: any;
  @Output() bookmarkEvent = new EventEmitter<any>();

  sendBookmark() {
    this.bookmarkEvent.emit(this.repository);
  }

}
