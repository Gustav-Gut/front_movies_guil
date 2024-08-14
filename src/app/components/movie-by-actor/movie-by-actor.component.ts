import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Movie } from '../../interfaces/movies.interface';
import { MoviesService } from '../../services/movies.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';

let ELEMENT_DATA: Movie[] = [];

@Component({
  selector: 'app-movie-by-actor',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule],
  templateUrl: './movie-by-actor.component.html',
  styleUrl: './movie-by-actor.component.scss',
})
export class MovieByActorComponent implements OnChanges, AfterViewInit {
  @Input() actor!: string;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['title', 'year', 'parseDuration'];
  dataSource: MatTableDataSource<Movie>;

  constructor(
    private cdr: ChangeDetectorRef,
    private moviesService: MoviesService
  ) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actor']) {
      this.cdr.detectChanges();
      this.loadMoviesByActor(this.actor);
    }
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

  loadMoviesByActor(selectedActor: string): void {
    this.moviesService.getMoviesByActor(selectedActor).subscribe({
      next: (movies) => {
        console.log('movies actor -->', movies);
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

  public parseDuration(duration: string): number {
    const match = duration.match(/PT(\d+)M/);
    return match ? parseInt(match[1], 10) : 0;
  }
}
