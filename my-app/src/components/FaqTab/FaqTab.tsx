import React from 'react';
import { Accordion } from '../UI/Accordion/Accordion';
import { RECEIVE_CARD, USING_CARD } from '../../consts/consts';

import classes from './FaqTab.module.scss';

export const FaqTab = () => {
  return (
    <section>
      <article className={classes.faq}>
        <h2 className={classes.faq__title}>Issuing and receiving a card</h2>
        {RECEIVE_CARD.map((item) => (
          <Accordion
            question={item.question}
            answer={item.answer}
            key={item.question}
          />
        ))}
      </article>
      <article className={classes.faq}>
        <h2 className={classes.faq__title}>Using a credit card</h2>
        {USING_CARD.map((item) => (
          <Accordion
            question={item.question}
            answer={item.answer}
            key={item.question}
          />
        ))}
      </article>
    </section>
  );
};
