import movies from '@/mock/dummy.json';

import { ReactNode } from 'react';

import style from './search.module.css';
import classNames from 'classnames/bind';

import MovieItem from '@/components/movie-item';
import SearchableLayout from '@/components/searchable-layout';

const cx = classNames.bind(style);

export default function Page() {
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
