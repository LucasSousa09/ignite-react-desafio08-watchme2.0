import { MovieCard } from "./MovieCard";

interface ContentProps {
  isFetching: boolean,
  selectedGenre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  } | undefined;

  movies: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }> | undefined;
}

export function Content({ selectedGenre, movies, isFetching}: ContentProps) {

  const moviesSkeleton = ['1','2','3','4','5','6']

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre?.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {
            isFetching ?
            moviesSkeleton.map((skelenton, index) => <div key={index} className='movie-skeleton'></div>)            
            :
            movies?.map(movie => (
              <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
        </div>
      </main>
    </div>
  )
}