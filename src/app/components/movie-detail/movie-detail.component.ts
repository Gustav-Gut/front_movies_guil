import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movies.interface';
import { CommonModule } from '@angular/common';
import { MovieByActorComponent } from '../movie-by-actor/movie-by-actor.component';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, MovieByActorComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | undefined;
  selectedActor: string | undefined;

  constructor() {}

  ngOnInit(): void {
    if (history.state.movie) {
      this.movie = history.state.movie as Movie;
    } else {
      console.log('No movie found in state');
    }
  }

  onActorClick(actor: string): void {
    this.selectedActor = actor;
  }
}
