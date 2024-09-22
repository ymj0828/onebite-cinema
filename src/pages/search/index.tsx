import { MovieData } from '@/types';

import { ReactNode, useEffect, useState } from 'react';

import style from './search.module.css';
import classNames from 'classnames/bind';
import Head from 'next/head';
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
      <Head>
        <title>한입 씨네마 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 씨네마 - 검색결과" />
        <meta property="og:description" content="한입 씨네마에 등록된 영화들을 만나보세요" />
      </Head>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
