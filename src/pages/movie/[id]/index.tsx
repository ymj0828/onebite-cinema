import style from './[id].module.css';
import classNames from 'classnames/bind';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import fetchMovies from '@/lib/fetch-movies';
import fetchOneMovie from '@/lib/fetch-one-movie';

const cx = classNames.bind(style);

export const getStaticPaths = async () => {
  const movies = await fetchMovies();

  return {
    paths: movies.map((movie) => ({
      params: { id: movie.id.toString() },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
  };
};

export default function Page({ movie }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입 씨네마</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입 씨네마" />
          <meta property="og:description" content="한입 씨네마에 등록된 영화들을 만나보세요" />
        </Head>
        <div>로딩중입니다</div>
      </>
    );
  }
  if (!movie) return '문제가 발생했습니다 다시 시도하세요';

  const { id, title, subTitle, company, runtime, description, posterImgUrl, releaseDate, genres } =
    movie;

  return (
    <>
      <Head>
        <title>{`한입 씨네마 | ${title}`}</title>
        <meta property="og:image" content={posterImgUrl} />
        <meta property="og:title" content={`한입 씨네마 | ${title}`} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={cx('container')}>
        <div
          className={cx('cover_img_container')}
          style={{ backgroundImage: `url('${posterImgUrl}')` }}
        >
          <img src={posterImgUrl} />
        </div>

        <div className={cx('info_container')}>
          <div>
            <h2>{title}</h2>
            <div>
              {releaseDate} / {genres.join(', ')} / {runtime}분
            </div>
            <div>{company}</div>
          </div>

          <div>
            <div className={cx('subTitle')}>{subTitle}</div>
            <div className={cx('description')}>{description}</div>
          </div>
        </div>
      </div>
    </>
  );
}
