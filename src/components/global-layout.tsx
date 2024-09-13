import { ReactNode } from 'react';

import style from './global-layout.module.css';
import classNames from 'classnames/bind';
import Link from 'next/link';

const cx = classNames.bind(style);

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={cx('container')}>
      <header className={cx('header')}>
        <Link href={'/'}>ONEBITE CINEMA</Link>
      </header>
      <main className={cx('main')}>{children}</main>
    </div>
  );
}
