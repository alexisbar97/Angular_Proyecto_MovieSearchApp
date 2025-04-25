import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../movie.service';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { HeaderComponent } from '../header/header.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CommonModule,
    MovieListComponent,
    MatCardModule,
    MatProgressSpinnerModule,
    SearchBarComponent,
    HeaderComponent,
    MatIconModule
  ],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  query: string = '';
  movies: any[] = [];
  loading: boolean = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      if (this.query) {
        this.search();
      }
    });
  }

  search(): void {
    if (this.query) {
      this.loading = true;
      this.movieService.searchMovies(this.query).subscribe({
        next: (data) => {
          this.movies = data.results.filter((movie: { poster_path: string | null; }) => movie.poster_path !== null && movie.poster_path !== '');
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }

  clearMovies(): void {
    this.movies = [];
    this.query = '';
  }
}
