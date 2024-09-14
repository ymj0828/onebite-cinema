import movies from '@/mock/dummy.json';

import { ReactNode } from 'react';

import style from './index.module.css';
import classNames from 'classnames/bind';

import MovieItem from '@/components/movie-item';
import SearchableLayout from '@/components/searchable-layout';

const cx = classNames.bind(style);

export default function Home() {
  return (
    <div className={cx('container')}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={cx('reco_container')}>
          {movies.slice(0, 3).map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={cx('all_container')}>
          {movies.map((movie) => (
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
