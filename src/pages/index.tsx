import { ReactNode } from 'react';

import style from './index.module.css';
import classNames from 'classnames/bind';
import { InferGetStaticPropsType } from 'next';

import MovieItem from '@/components/movie-item';
import SearchableLayout from '@/components/searchable-layout';

import fetchMovies from '@/lib/fetch-movies';
import fetchRandomMovie from '@/lib/fetch-random-movie';

const cx = classNames.bind(style);

export const getStaticProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([fetchMovies(), fetchRandomMovie()]);

  return {
    props: {
      allMovies,
      recoMovies,
    },
  };
};

export default function Home({
  allMovies,
  recoMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={cx('container')}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={cx('reco_container')}>
          {recoMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={cx('all_container')}>
          {allMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
