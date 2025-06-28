import { Link } from 'react-router-dom';

import oops from '../../assets/images/Oops.webp';
import classes from './PageNotFound.module.scss';

export const PageNotFound = () => {
  return (
    <section className={classes.notFound}>
      <article className={classes.notFound__info}>
        <h1 className={classes.notFound__title}>
          Oops....
          <br />
          <span className={classes.notFound__subTitle}>Page not found</span>
        </h1>
        <p className={classes.notFound__text}>
          This Page doesn`t exist or was removed! We suggest you go back.
        </p>
        <Link
          to="/"
          className={classes.notFound__goBack}
          aria-label="Return to homepage"
        >
          Go back
        </Link>
      </article>
      <figure className={classes.notFound__imgWrapper}>
        <img
          src={oops}
          alt="Page not found illustration"
          className={classes.notFound__img}
          loading="lazy"
        />
      </figure>
    </section>
  );
};
