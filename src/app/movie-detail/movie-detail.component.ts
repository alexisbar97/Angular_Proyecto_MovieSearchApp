import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, HeaderComponent],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  query: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieDetails(id).subscribe(data => {
        this.movie = data;
      });
    }

    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
    });
  }

  goBack(): void {
    this.router.navigate(['/busqueda'], { queryParams: { q: this.query } });
  }
}
