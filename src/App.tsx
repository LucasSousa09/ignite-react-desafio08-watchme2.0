import 'regenerator-runtime/runtime'

import { useQuery  } from 'react-query'
import { queryClient } from './services/api';

import { useCallback, useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GetMoviesByIdProps {
  movies: MovieProps[],
  genre: GenreResponseProps
}


export function App() {
  
  const [ selectedGenreId, setSelectedGenreId ] = useState(1);
  const [ prefetchId, setPrefetchId ] = useState(1)

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  
  // const [movies, setMovies] = useState<MovieProps[]>([]);
  // const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  

  async function getMoviesById(id:number): Promise<GetMoviesByIdProps>{
    const { data: movies } = await api.get<MovieProps[]>(`movies/?Genre_id=${id}`)
    const { data: genre} = await api.get<GenreResponseProps>(`genres/${id}`)

    return { movies, genre }
  }

  const { data, isFetching } = useQuery(['moviesByGenre', selectedGenreId], () => getMoviesById(selectedGenreId), {staleTime: 1000 * 60 * 10})

  async function handleHover(id:number){
    await queryClient.prefetchQuery(['moviesByGenre', id], () =>  getMoviesById(id), {staleTime: 1000 * 60 * 10 })
  }

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  // useEffect(() => {
  //   api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
  //     setMovies(response.data);
  //   });

  //   api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
  //     setSelectedGenre(response.data);
  //   })
  // }, [selectedGenreId]);

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  },[])

  return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar
          isFetching={isFetching}
          genres={genres}
          selectedGenreId={selectedGenreId}
          buttonClickCallback={handleClickButton}
          buttonHover={handleHover}
        />

        <Content
          isFetching={isFetching}
          selectedGenre={data?.genre}
          movies={data?.movies}
        />
      </div>
  )
}