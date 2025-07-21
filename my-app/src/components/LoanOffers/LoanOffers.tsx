import React from 'react';
import { CardOffer } from '../CardOffer/CardOffer';
import { OFFER_DESCRIPTION } from '../../consts/consts';

import classes from './LoanOffers.module.scss';

export const LoanOffers = () => {
  return (
    <section className={classes.loanOffer} aria-label="Loan offers">
      {OFFER_DESCRIPTION.map((item) => (
        <CardOffer key={item.monthlyPayment} {...item} />
      ))}
    </section>
  );
};
