export interface Movie {
  title: string;
  year: string;
  genres: string[];
  ratings: number[];
  viewerCount: number;
  storyline: string;
  actors: string[];
  duration: string;
  parseDuration: number;
  releaseDate: string;
  contentRating: string;
  posterImage: string;
  [key: string]: any;
}
