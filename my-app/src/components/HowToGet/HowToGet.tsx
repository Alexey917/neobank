import React, { FC, RefObject } from 'react';
import { Divider } from '../UI/Divider/Divider';

import classes from './HowToGet.module.scss';
import { CustomizeCardForm } from '../CustomizeCardForm/CustomizeCardForm';
import { LoanOffers } from '../LoanOffers/LoanOffers';
import { Message } from '../Message/Message';

const STEPS_GET_Card = [
  'Fill out an online application - you do not need to visit the bank',
  "Find out the bank's decision immediately after filling out the application",
  'The bank will deliver the card free of charge, wherever convenient, to your city',
];

interface IHowToGetACardProps {
  formRef: RefObject<HTMLFormElement | null>;
}

export const HowToGet: FC<IHowToGetACardProps> = ({ formRef }) => {
  return (
    <section className={classes.how} aria-labelledby="how-to-get-card-heading">
      <h2 id="how-to-get-card-heading" className={classes.how__title}>
        How to get a card
      </h2>
      <article className={classes.how__steps} aria-label="Steps to get a card">
        {STEPS_GET_Card.map((step, index) => (
          <div
            key={index}
            className={`${classes.how__stepMap} ${
              classes[`how__stepMap_${index + 1}`]
            }`}
            role="listitem"
          >
            <div className={classes.how__stepNumWrapper}>
              <div className={classes.how__stepNum} aria-hidden="true">
                {index + 1}
              </div>
              <Divider
                type="howTo"
                orientation="horizontal"
                width={15.625}
                thickness={0.125}
                variant="solid"
                color="grey"
                aria-hidden="true"
              />
            </div>
            <p className={classes.how__stepInfo}>{step}</p>
          </div>
        ))}
      </article>
      <CustomizeCardForm formRef={formRef} />
      <LoanOffers />
      <Message
        title="The preliminary decision has been sent to your email."
        text="In the letter you can get acquainted with the preliminary decision on
        the credit card."
      />
    </section>
  );
};
