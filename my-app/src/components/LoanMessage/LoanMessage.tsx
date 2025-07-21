import React, { FC } from 'react';

import classes from './LoanMessage.module.scss';

export const LoanMessage: FC = () => {
  return (
    <section className={classes.loanMessage}>
      <h2 className={classes.loanMessage__title} aria-live="polite">
        The preliminary decision has been sent to your email.
      </h2>
      <p className={classes.loanMessage__text}>
        In the letter you can get acquainted with the preliminary decision on
        the credit card.
      </p>
    </section>
  );
};
