import { ReactNode } from 'react';

import style from './search.module.css';
import classNames from 'classnames/bind';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import MovieItem from '@/components/movie-item';
import SearchableLayout from '@/components/searchable-layout';

import fetchMovies from '@/lib/fetch-movies';

const cx = classNames.bind(style);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const q = context.query.q;
  const movies = await fetchMovies(q as string);

  return {
    props: {
      movies,
    },
  };
};

export default function Page({ movies }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
