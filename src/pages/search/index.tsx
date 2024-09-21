import { MovieData } from '@/types';

import { ReactNode, useEffect, useState } from 'react';

import style from './search.module.css';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';

import MovieItem from '@/components/movie-item';
import SearchableLayout from '@/components/searchable-layout';

import fetchMovies from '@/lib/fetch-movies';

const cx = classNames.bind(style);

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const movies = await fetchMovies(q as string);
    setMovies(movies);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div className={cx('container')}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
