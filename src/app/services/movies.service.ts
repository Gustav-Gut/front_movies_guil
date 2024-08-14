import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movies.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}`);
  }

  getPopularitiesMovies(order: 'ASC' | 'DSC'): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/popularity?order=${order}`);
  }

  getMoviesByActor(actor: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/by-actor?actor=${actor}`);
  }

  findSimilarMovies(params: any): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/similar`, { params });
  }
}
