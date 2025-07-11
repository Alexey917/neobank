import React from 'react';
import { Divider } from '../UI/Divider/Divider';

import classes from './HowToGetACard.module.scss';
import { CustomizeCardFrom } from '../CustomizeCardFrom/CustomizeCardFrom';

const STEPS_GET_Card = [
  'Fill out an online application - you do not need to visit the bank',
  "Find out the bank's decision immediately after filling out the application",
  'The bank will deliver the card free of charge, wherever convenient, to your city',
];

export const HowToGetACard = () => {
  return (
    <section className={classes.how}>
      <h2 className={classes.how__title}>How to get a card</h2>
      <article className={classes.how__steps}>
        {STEPS_GET_Card.map((step, index) => (
          <div
            key={index}
            className={`${classes.how__stepMap} ${
              classes[`how__stepMap_${index + 1}`]
            }`}
          >
            <div className={classes.how__stepNumWrapper}>
              <div className={classes.how__stepNum}>{index + 1}</div>
              <Divider
                orientation="horizontal"
                width={15.625}
                thickness={0.125}
                variant="solid"
                color="grey"
              />
            </div>
            <p className={classes.how__stepInfo}>{step}</p>
          </div>
        ))}
      </article>
      <CustomizeCardFrom />
    </section>
  );
};
