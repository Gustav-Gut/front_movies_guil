import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from '../../interfaces/movies.interface';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

let ELEMENT_DATA: Movie[] = [];

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatButtonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['title', 'year', 'parseDuration', 'popularity'];
  dataSource: MatTableDataSource<Movie>;
  selectedMovie?: Movie;

  constructor(private moviesService: MoviesService, private router: Router) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'parseDuration':
          return item.parseDuration;
        default:
          return item[property];
      }
    };
  }

  loadMovies(): void {
    this.moviesService.getMovies().subscribe({
      next: (movies) => {
        this.dataSource.data = movies.map((movie) => ({
          ...movie,
          parseDuration: this.parseDuration(movie.duration),
        }));
      },
      error: (error) => {
        console.error('Error loading movies', error);
      },
    });
  }

  loadPopularMovies(order: 'ASC' | 'DSC') {
    this.moviesService.getPopularitiesMovies(order).subscribe({
      next: (popularMovies) => {
        this.dataSource.data = popularMovies.map((movie) => ({
          ...movie,
          parseDuration: this.parseDuration(movie.duration),
        }));
      },
      error: (error) => {
        console.error('Error loading movies:', error);
      },
    });
  }

  public parseDuration(duration: string): number {
    const match = duration.match(/PT(\d+)M/);
    return match ? parseInt(match[1], 10) : 0;
  }

  onSelectMovie(movie: Movie): void {
    console.log('movie -->', movie);
    this.router.navigate(['/movies/detail'], { state: { movie: movie } });
  }
}
