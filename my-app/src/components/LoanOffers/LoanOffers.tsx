import React from 'react';
import { CardOffer } from '../CardOffer/CardOffer';
import { OFFER_DESCRIPTION } from '../../consts/consts';

import classes from './LoanOffers.module.scss';
import { IOffer } from 'src/types/types';

export const LoanOffers = () => {
  const data: IOffer[] = JSON.parse(localStorage.getItem('offers')!);

  return (
    <section className={classes.loanOffer} aria-label="Loan offers">
      {data &&
        data.map((item) => <CardOffer key={item.monthlyPayment} item={item} />)}
    </section>
  );
};
