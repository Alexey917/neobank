import React, { FC } from 'react';
import { ABOUT_TAB } from '../../consts/consts';

import classes from './AboutTab.module.scss';

export const AboutTab: FC = () => {
  return (
    <section className={classes.about} aria-label="About card">
      {ABOUT_TAB.map((item, index) => (
        <article
          key={item.title}
          className={`${classes.about__wrapper} ${
            classes[`about__wrapper_${index}`]
          }`}
        >
          <svg
            className={classes.about__icon}
            aria-hidden="true"
            focusable="false"
          >
            <use href={item.svg + `#${item.svgId}`}></use>
          </svg>

          <h3 className={classes.about__title}>{item.title}</h3>
          <p className={classes.about__text}>{item.text}</p>
        </article>
      ))}
    </section>
  );
};
