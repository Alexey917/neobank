import React, { useState } from 'react';
import { Accordion } from '../UI/Accordion/Accordion';
import { RECEIVE_CARD, USING_CARD } from '../../consts/consts';

import classes from './FaqTab.module.scss';

export const FaqTab = () => {
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  const handleAccordionClick = (id: string) => {
    setOpenAccordionId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section aria-label="Frequently Asked Questions">
      <article className={classes.faq} aria-labelledby="receiving-heading">
        <h2 className={classes.faq__title} id="receiving-heading">
          Issuing and receiving a card
        </h2>
        {RECEIVE_CARD.map((item, index) => (
          <Accordion
            question={item.question}
            answer={item.answer}
            isOpen={openAccordionId === item.question}
            onClick={() => handleAccordionClick(item.question)}
            key={`receive-${index}`}
          />
        ))}
      </article>
      <article className={classes.faq} aria-labelledby="using-heading">
        <h2 className={classes.faq__title} id="using-heading">
          Using a credit card
        </h2>
        {USING_CARD.map((item, index) => (
          <Accordion
            question={item.question}
            answer={item.answer}
            isOpen={openAccordionId === item.question}
            onClick={() => handleAccordionClick(item.question)}
            key={`using-${index}`}
          />
        ))}
      </article>
    </section>
  );
};
