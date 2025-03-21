import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './category-search.component.html',
  styleUrl: './category-search.component.scss',
})
export class CategorySearchComponent {
  input_search: string = '';
  @Output() searchEvent = new EventEmitter<string>();
  onSearch() {
    this.searchEvent.emit(this.input_search);
  }
}
