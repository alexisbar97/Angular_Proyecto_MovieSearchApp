import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  query: string = '';
  @Output() clearResults = new EventEmitter<void>();

  constructor(private router: Router) { }

  search(): void {
    if (this.query) {
      this.router.navigate(['/busqueda'], { queryParams: { q: this.query } });
    }
  }

  clearSearch(): void {
    this.query = '';
    this.clearResults.emit();
  }
}
