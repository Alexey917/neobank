import { FC } from 'react';
import { FeatureItem } from '../FeatureItem/FeatureItem';

import classes from './Features.module.scss';
import features from '../../assets/images/features.webp';

export const Features: FC = () => {
  return (
    <section className={classes.features} aria-labelledby="features-heading">
      <figure className={classes.features__imgWrapper}>
        <img src={features} alt="features" className={classes.features__img} />
      </figure>

      <article>
        <h2 className={classes.features__title} id="features-heading">
          We Provide Many Features You Can Use
        </h2>
        <p className={classes.features__text}>
          You can explore the features that we provide with fun and have their
          own functions each feature
        </p>

        <ul className={classes.features__list}>
          <FeatureItem text="Powerful online protection." />
          <FeatureItem text="Cashback without borders." />
          <FeatureItem text="Personal design" />
          <FeatureItem text="Work anywhere in the world" />
        </ul>
      </article>
    </section>
  );
};
